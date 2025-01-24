from newsapi import NewsApiClient
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

class NewsService:
    def __init__(self):
        api_key = os.getenv('NEWS_API_KEY')
        if not api_key:
            raise ValueError("NEWS_API_KEY not found in environment variables")
        self.newsapi = NewsApiClient(api_key=api_key)

    async def fetch_company_news(self, company_symbol, days=7):
        try:
            end_date = datetime.now()
            start_date = end_date - timedelta(days=days)
            
            response = self.newsapi.get_everything(
                q=company_symbol,
                language='en',
                sort_by='publishedAt',
                from_param=start_date.strftime('%Y-%m-%d'),
                to=end_date.strftime('%Y-%m-%d')
            )
            
            if 'articles' in response:
                return response['articles']
            return []
            
        except Exception as e:
            print(f"Error fetching news: {str(e)}")
            return []

    async def save_news_to_db(self, db, company_symbol, articles):
        try:
            if articles:
                await db.raw_news.insert_many([
                    {
                        'company': company_symbol,
                        'title': article.get('title'),
                        'description': article.get('description'),
                        'content': article.get('content'),
                        'published_at': article.get('publishedAt'),
                        'source': article.get('source', {}).get('name'),
                        'url': article.get('url'),
                        'collected_at': datetime.utcnow()
                    }
                    for article in articles
                ])
            return True
        except Exception as e:
            print(f"Error saving to database: {str(e)}")
            return False