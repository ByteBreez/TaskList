// src/api.js
import axios from 'axios';
console.log('API baseURL:', import.meta.env.VITE_API_URL); 
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // your Render backend
  withCredentials: true,                   // always send/receive cookies
});

export default api;
