/* global fetch */

import { API_BASE_URL } from '.';

export async function fetchPacientes() {
  const res = await fetch(`${API_BASE_URL}/pacientes`, {
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Error fetching pacientes');
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

