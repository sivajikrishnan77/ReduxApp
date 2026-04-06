import axios from 'axios';
import { store } from '../store/store';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("TOKEN:", token);
  }
  return config;
},
(error)=>{
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true;

      const refreshToken = store.getState().auth.user?.refreshToken;

      try {

        const response = await axios.post(
          "https://dummyjson.com/auth/refresh",
          { refreshToken }
        );

        const newAccessToken = response.data.accessToken;

        // update Redux token
        store.dispatch({
          type: "auth/updateToken",
          payload: newAccessToken
        });

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        
        return api(originalRequest);

      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

// Optional: Add request interceptors here later for auth tokens
export default api;