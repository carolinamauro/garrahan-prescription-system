import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // equivalente a fetch { credentials: 'include' }
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(request => {
  console.group('API Request');
  console.log('URL:', request.url);
  console.log('Method:', request.method);
  console.log('Headers:', request.headers);
  console.log('Payload:', request.data);
  console.groupEnd();
  return request;
});

apiClient.interceptors.response.use(
  response => {
    console.group('API Response');
    console.log('URL:', response.config.url);
    console.log('Status:', response.status);
    console.log('Response Body:', response.data);
    console.groupEnd();
    return response;
  },
  error => {
    console.group('API Error');
    console.error('URL:', error.config?.url);
    console.error('Status:', error.response?.status);
    console.error('Response Body:', error.response?.data);
    console.error('Request Payload:', error.config?.data);
    console.groupEnd();

    if (error.response?.status === 401) {
      console.error('No autorizado');
    }

    return Promise.reject(error);
  }
);
