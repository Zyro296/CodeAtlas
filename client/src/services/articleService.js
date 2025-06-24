import axios from 'axios';

// Use relative URL in production, localhost in development
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost/api';

export const getArticles = async () => {
  const response = await axios.get(`${API_URL}/articles`);
  return response.data;
};

export const getArticle = async (id) => {
  const response = await axios.get(`${API_URL}/articles/${id}`);
  return response.data;
};

export const createArticle = async (articleData) => {
  const response = await axios.post(`${API_URL}/articles`, articleData);
  return response.data;
};