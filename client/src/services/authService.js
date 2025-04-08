import API from './api';

export const loginUser = async (credentials) => {
  const response = await API.post('/auth/login', credentials);
  return response.data; // Contains { token, user }
};

export const registerUser = async (userData) => {
  const response = await API.post('/auth/register', userData);
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};
