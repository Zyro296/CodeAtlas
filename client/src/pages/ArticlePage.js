import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getArticle } from '../services/articleService';

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticle(id);
        setArticle(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch article');
        setLoading(false);
      }
    };
    
    fetchArticle();
  }, [id]);

  if (loading) return <div>Loading article...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!article) return <div className="error">Article not found</div>;

  return (
    <div className="article-page">
      <Link to="/" className="back-link">← Back to Home</Link>
      <h1>{article.title}</h1>
      <div className="article-content">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>
    </div>
  );
}

export default ArticlePage;