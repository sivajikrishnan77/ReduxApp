import api from './client';

export const loginApi = async (username: string, password: string) => {
  // Using the 'api' instance from client.ts
  const response = await api.post('/auth/login', {
    username,
    password,
  });

  


  // DummyJSON returns an object containing 'accessToken'
  return response.data;
};
