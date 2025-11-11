import { apiClient } from './apiClient';

export async function fetchAlarmas() {
  const { data } = await apiClient.get('/alarmas');
  return data;
}

export async function fetchAlarmasPorProfesional() {
  const { data } = await apiClient.get('/alarmas/profesional');
  return data;
}
