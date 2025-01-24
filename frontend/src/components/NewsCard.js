const NewsCard = ({ title, description, source, url, publishedAt, sentiment }) => (
  <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10">
    <div className="flex justify-between items-start gap-4">
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      {sentiment && (
        <div className={`px-4 py-2 rounded-full text-sm font-medium ${
          sentiment.label === 'POSITIVE' ? 'bg-green-500/20 text-green-300 border border-green-500/50' : 
          sentiment.label === 'NEGATIVE' ? 'bg-red-500/20 text-red-300 border border-red-500/50' : 
          'bg-gray-500/20 text-gray-300 border border-gray-500/50'
        }`}>
          {sentiment.label} ({Math.round(sentiment.score * 100)}%)
        </div>
      )}
    </div>
    <p className="text-gray-300 mb-4">{description}</p>
    <div className="flex justify-between items-center text-sm text-gray-400">
      <span>{source?.name || 'Unknown'}</span>
      <time className="text-gray-400">{new Date(publishedAt).toLocaleDateString()}</time>
    </div>
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="mt-4 inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full hover:bg-blue-500/30 transition-colors border border-blue-500/50"
    >
      Read More →
    </a>
  </div>
);

export default NewsCard;