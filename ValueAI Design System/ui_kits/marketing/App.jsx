// App.jsx — root component + routing
const { useState } = React;

const App = () => {
  const [page, setPage] = useState('home');
  const [selectedModel, setSelectedModel] = useState(null);

  const renderPage = () => {
    switch (page) {
      case 'home':      return <HomePage setPage={setPage} />;
      case 'compare':   return <ComparePage setPage={setPage} setSelectedModel={setSelectedModel} />;
      case 'model':     return <ModelPage model={selectedModel} setPage={setPage} />;
      case 'blog':
      case 'changelog': return <BlogPage setPage={setPage} />;
      default:          return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <Nav page={page} setPage={setPage} />
      {renderPage()}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
