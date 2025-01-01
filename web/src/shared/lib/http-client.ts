import axios from 'axios';
import {SERVICE_URL} from '@/constants';

export const httpClient = axios.create({
  baseURL: SERVICE_URL,
  withCredentials: true,
});
