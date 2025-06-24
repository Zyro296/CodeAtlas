const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route for testing
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Wiki API is running' });
});

//Simple in-memory article storage (will replace with a database later)
let articles = [
    {
        if: 1,
        title: 'Welcome to CodeAtlas',
        content: '# Welcome to Your Software Engineering Wiki\n\nThis is the beginning of your knowledge repository.'
    }
];

//API routes
app.get('/api/articles', (req, res) => {
    res.json(articles);
});

app.get('/api/articles/:id', (req, res) => {
      const article = articles.find(a => a.id === parseInt(req.params.id));
  if (!article) return res.status(404).json({ message: 'Article not found' });
  res.json(article);
});

app.post('/api/articles', (req, res) => {
      const newArticle = {
    id: articles.length + 1,
    title: req.body.title,
    content: req.body.content
  };
  articles.push(newArticle);
  res.status(201).json(newArticle);
});

//start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});