const Layout = ({ children }) => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <nav className="bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white">
            Financial Insights <span className="text-blue-400">AI</span>
          </h1>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-8 px-4">{children}</main>
    </div>
  );

  export default Layout;