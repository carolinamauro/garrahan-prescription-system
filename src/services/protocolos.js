import { apiClient } from './apiClient';

export async function fetchProtocolos() {
  const { data } = await apiClient.get('/protocolos');
  return data;
}

export async function fetchProtocoloPaciente(idPaciente) {
  const { data } = await apiClient.get(`/pacientes/${idPaciente}/protocolo-actual`);
  return data;
}

export async function fetchCiclos(protocoloId) {
  const { data } = await apiClient.get(`/protocolos/${protocoloId}/ciclos`);
  return data;
}
