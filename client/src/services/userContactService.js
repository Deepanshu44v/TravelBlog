// src/services/contactService.js
import API from './api'; // your axios instance

export const sendContactMessage = async (formData) => {
  const response = await API.post('/contact/form', formData);
  return response.data;
};
