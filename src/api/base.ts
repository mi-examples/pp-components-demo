import axios from 'axios';

export const api = axios.create({
  method: 'GET',
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
