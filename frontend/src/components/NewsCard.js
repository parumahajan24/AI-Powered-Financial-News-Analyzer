const NewsCard = ({ title, description, source, url, publishedAt }) => (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">{source?.name || 'Unknown'}</span>
        <span className="text-gray-500">{new Date(publishedAt).toLocaleDateString()}</span>
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">Read more</a>
    </div>
  );
  
  export default NewsCard;