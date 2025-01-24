from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.services.news_service import NewsService
import os
import logging
from motor.motor_asyncio import AsyncIOMotorClient
from app.services.sentiment_service import SentimentAnalyzer
from app.services.news_service import NewsService

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="AI Powered Financial News Analyzer")
news_service = NewsService()
sentiment_analyzer = SentimentAnalyzer()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db_client():
    try:
        app.mongodb = AsyncIOMotorClient(os.getenv("MONGODB_URI")).financial_news_db
        logger.info("Connected to MongoDB")
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
        
@app.get("/api/news/{company_symbol}")
async def get_company_news(company_symbol: str, days: int = 7):
    try:
        articles = await news_service.fetch_company_news(company_symbol, days)
        if articles:
            sentiment_results = await sentiment_analyzer.analyze_news(articles)
            save_result = await news_service.save_news_to_db(app.mongodb, company_symbol, articles)
            await sentiment_analyzer.save_sentiment_to_db(app.mongodb, company_symbol, sentiment_results)
            #logger.info(f"Save to DB result: {save_result}")
            return {
                "status": "success",
                "data": articles,
                "sentiment": sentiment_results
            }
        raise HTTPException(status_code=404, detail="No news found")
    except Exception as e:
        logger.error(f"Error in get_company_news: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="localhost", port=8000, reload=True)