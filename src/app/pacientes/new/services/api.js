/* global fetch */
const API_BASE_URL = 'http://localhost:3000';

export async function fetchProtocolos() {
  const res = await fetch(`${API_BASE_URL}/protocolos`, {
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Error fetching protocolos');
  return res.json();
}

export async function fetchCiclos(protocoloId) {
  const res = await fetch(`${API_BASE_URL}/protocolos/${protocoloId}/ciclos`, {
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Error fetching ciclos');
  return res.json();
}

export async function searchExternalPatient(id) {
  const res = await fetch(`${API_BASE_URL}/pacientes/${encodeURIComponent(id)}/externo`, {
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Paciente no encontrado');
  return res.json();
}

export async function createPatient(patientData) {
  const res = await fetch(`${API_BASE_URL}/pacientes`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patientData)
  });
  if (!res.ok) throw new Error('Error al crear paciente');
  return res.json();
}
