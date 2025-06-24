import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../services/articleService';

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch articles');
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, []);

  if (loading) return <div>Loading articles...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home-page">
      <h1>Software Engineering Wiki</h1>
      
      {articles.length === 0 ? (
        <p>No articles yet. Be the first to create one!</p>
      ) : (
        <div className="article-list">
          {articles.map(article => (
            <div key={article.id} className="article-card">
              <h2>
                <Link to={`/article/${article.id}`}>{article.title}</Link>
              </h2>
            </div>
          ))}
        </div>
      )}
      
      <Link to="/create" className="button">Create New Article</Link>
    </div>
  );
}

export default HomePage;