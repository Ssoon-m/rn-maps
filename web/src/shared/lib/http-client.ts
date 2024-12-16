import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'http://localhost:3030',
  // baseURL: 'http://10.0.2.2:3030', // andriod baseURL
  withCredentials: true,
});
