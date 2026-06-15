import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const getAtendimentos = async (params = {}) => {
  const response = await api.get('/atendimentos', { params });
  return response.data;
};

export const getMetricas = async () => {
  const response = await api.get('/atendimentos/metricas');
  return response.data;
};

export default api;