import { apiClient } from './apiClient';

export async function getCurrentProtocol(patientId) {
  const { data } = await apiClient.get(`/pacientes/${patientId}/protocolo-actual`);
  return data;
}

export async function getPresentationsByDrug(drugId) {
  const { data } = await apiClient.get(`/drogas/${drugId}/presentaciones`);
  return data;
}

export async function calculateDrug(payload) {
  const { data } = await apiClient.post('/calculo/calculo-droga', payload);
  return data;
}
