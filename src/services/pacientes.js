import { apiClient } from './apiClient';

export async function fetchPacientes() {
  const { data } = await apiClient.get('/pacientes');
  return data;
}

export async function searchExternalPatient(id) {
  const { data } = await apiClient.get(`/pacientes/${encodeURIComponent(id)}/externo`);
  return data;
}

export async function createPatient(patientData) {
  const { data } = await apiClient.post('/pacientes', patientData);
  return data;
}
