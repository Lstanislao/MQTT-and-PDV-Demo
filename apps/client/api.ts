import Axios from 'axios';
import { ENDPOINT } from './config';

export const axios = Axios.create({
  baseURL: ENDPOINT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'x-access-token':
      typeof window !== 'undefined' ? localStorage.getItem('token') : undefined,
  },
});

export const axiosS3 = Axios.create({
  baseURL: ENDPOINT,
  headers: {
    'x-amz-acl': 'public-read',
  },
});
