import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Благодаря прокси Vite, это уйдет на твой Node.js сервер
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Предполагаем, что токен хранится здесь
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;