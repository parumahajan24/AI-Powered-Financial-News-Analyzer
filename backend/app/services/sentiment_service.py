from textblob import TextBlob
from datetime import datetime

class SentimentAnalyzer:
    async def analyze_text(self, text):
        if not text:
            return {"label": "NEUTRAL", "score": 0.5}
        analysis = TextBlob(str(text))
        score = (analysis.sentiment.polarity + 1) / 2
        return {
            "label": "POSITIVE" if score > 0.6 else "NEGATIVE" if score < 0.4 else "NEUTRAL",
            "score": score
        }

    async def analyze_news(self, articles):
        return [{
            'title': article['title'],
            'sentiment': await self.analyze_text(f"{article.get('title', '')} {article.get('description', '')}")
        } for article in articles]
    
    async def save_sentiment_to_db(self, db, company_symbol, sentiments):
        try:
            if sentiments:
                sentiment_docs = [{
                    'company': company_symbol,
                    'title': sentiment['title'],
                    'sentiment': sentiment['sentiment'],
                    'analyzed_at': datetime.utcnow()
                } for sentiment in sentiments]
                await db.sentiment_analysis.insert_many(sentiment_docs)
                return True
        except Exception as e:
            print(f"Sentiment save error: {str(e)}")
            return False