// NewsDisplay.js
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import NewsCard from './NewsCard';

const NewsDisplay = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState('AAPL');
  const [filter, setFilter] = useState('all');

  const companies = [
    { value: 'AAPL', label: 'Apple', icon: '🍎' },
    { value: 'MSFT', label: 'Microsoft', icon: '💻' },
    { value: 'GOOGL', label: 'Google', icon: '🔍' },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/news/${company}`);
        const newsWithSentiment = response.data.data.map((item, index) => ({
          ...item,
          sentiment: response.data.sentiment[index].sentiment
        }));
        setNews(newsWithSentiment);
      } catch (error) {
        console.error('Error:', error);
      }
      setLoading(false);
    };

    fetchNews();
  }, [company]);

  const filteredNews = useMemo(() => {
    if (filter === 'all') return news;
    return news.filter(item => item.sentiment?.label === filter.toUpperCase());
  }, [news, filter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/5 p-4 rounded-lg">
        <select 
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20"
        >
          {companies.map(({ value, label, icon }) => (
            <option key={value} value={value}>{icon} {label}</option>
          ))}
        </select>

        <div className="flex gap-2">
          {['all', 'positive', 'negative', 'neutral'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full capitalize ${
                filter === type 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredNews.map((item, index) => (
            <NewsCard key={index} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsDisplay;