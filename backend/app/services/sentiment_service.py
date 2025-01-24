from textblob import TextBlob

class SentimentAnalyzer:
    async def analyzer_text(Self, text):
        analysis = TextBlob(text)
        # Convert polarity (-1 to 1) to score (0 to 1)
        score = (analysis.sentiment.polarity + 1) / 2
        return {
            "label":"POSITIVE" if score > 0.6 else "NEGATIVE" if score < 0.4 else "NEUTRAL",
            "score": score
        }

    async def analyze_news(self, articles):
        return [{
            'title': article['title'],
            'sentiment': await self.analyzer_text(article['title'] + " " + article.get('description', ''))  
        } for article in articles]
