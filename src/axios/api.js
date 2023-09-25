// src/axios.js atau src/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://www.absensi.creativeme.tech/api', // Ganti dengan URL API Sanctum Anda
  withCredentials: true,
});

export default apiClient;
