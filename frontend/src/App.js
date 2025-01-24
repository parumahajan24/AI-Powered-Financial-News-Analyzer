import NewsDisplay from './components/NewsDisplay';

const App = () => (
  <div className="min-h-screen bg-gray-100">
    <header className="bg-white shadow mb-8">
      <div className="max-w-4xl mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-gray-900">
         AI Powered Financial News Analyzer
        </h1>
      </div>
    </header>
    <NewsDisplay />
  </div>
);

export default App;