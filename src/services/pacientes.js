import { apiClient } from './apiClient';
import { fetchProtocoloPaciente } from './protocolos';
import { calcularEdad } from '@/lib/utils';

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

export async function updatePaciente(id, updates) {
  const { data } = await apiClient.patch(`/pacientes/${id}`, {
    peso: updates.peso,
    altura: updates.altura,
    obra_social: updates.obra_social
  });
  return data;
}

export async function loadPatientWithProtocol(paciente) {
  const { anios, dias } = calcularEdad(paciente.fecha_nacimiento);
  try {
    const protocolo = await fetchProtocoloPaciente(paciente.paciente_id);
    return { ...paciente, protocolo, anios, dias };
  } catch {
    return { ...paciente, protocolo: null, anios, dias };
  }
}

export async function loadPatientsWithProtocols(pacientes) {
  return Promise.all(pacientes.map(loadPatientWithProtocol));
}
