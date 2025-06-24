import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { createArticle } from '../services/articleService';

function CreateArticlePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await createArticle({ title, content });
      navigate('/');
    } catch (err) {
      setError('Failed to create article');
      setSubmitting(false);
    }
  };

  return (
    <div className="create-page">
      <Link to="/" className="back-link">← Back to Home</Link>
      <h1>Create New Article</h1>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Content (Markdown)</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            required
          />
        </div>
        
        <button type="submit" disabled={submitting} className="button">
          {submitting ? 'Creating...' : 'Create Article'}
        </button>
      </form>
      
      <div className="preview">
        <h2>Preview</h2>
        <div className="preview-content">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default CreateArticlePage;