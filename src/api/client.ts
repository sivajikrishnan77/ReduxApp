import axios from 'axios';
import { store } from '../store/store';
import { updateToken } from '../store/slices/authSlice';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token && config.url !.includes('/auth/login') ) {
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

    if (error.response?.status === 401 && !originalRequest._retry&&!originalRequest.url.includes("auth/refresh")) {

      originalRequest._retry = true;

      const refreshToken = store.getState().auth.user?.refreshToken;

      try {
        console.log("Refresh Token Used");
        const response = await axios.post(
          "https://dummyjson.com/auth/refresh",
          { refreshToken }

          
        );

        const newAccessToken = response.data.accessToken;

        // update Redux token
        store.dispatch(updateToken(newAccessToken));

        originalRequest.headers={ ...originalRequest.headers,Authorization: `Bearer ${newAccessToken}`};
        
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