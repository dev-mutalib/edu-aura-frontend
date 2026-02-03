import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: 'https://edu-aura-backend-t1du.vercel.app/api',
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

// JSON only when body is JSON
api.interceptors.request.use((config) => {
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  } else {
    delete config.headers['Content-Type']; // VERY IMPORTANT
  }
  return config;
});

export default api;
