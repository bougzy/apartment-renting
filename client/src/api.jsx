import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adding an Authorization header if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;


// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://apartment-renting.vercel.app/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Adding an Authorization header if token exists
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = token;
//   }
//   return config;
// }, (error) => Promise.reject(error));

// export default api;



// import axios from 'axios';

// const api = axios.create({
//   baseURL: '/api',  // Use a relative URL path to match Vite's proxy configuration
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Adding an Authorization header if token exists
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => Promise.reject(error));

// export default api;
