import { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";

const NewsDisplay = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState("AAPL");

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/news/${company}`
        );
        setNews(response.data.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
      setLoading(false);
    };
    fetchNews();
  }, [company]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <select
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="AAPL">Apple</option>
        <option value="MSFT">Microsoft</option>
        <option value="GOOGL">Google</option>
      </select>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4">
          {news.map((item, index) => (
            <NewsCard key={index} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsDisplay;
