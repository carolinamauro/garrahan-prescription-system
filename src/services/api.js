/* global fetch */

import { API_BASE_URL } from '.';

export async function fetchPacientes() {
  const res = await fetch(`${API_BASE_URL}/pacientes`, {
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Error fetching pacientes');
  return res.json();
}

export async function fetchProtocolos() {
  const res = await fetch(`${API_BASE_URL}/protocolos`, {
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Error fetching protocolos');
  return res.json();
}

export async function fetchProtocoloPaciente(idPaciente) {
  const res = await fetch(`${API_BASE_URL}/pacientes/${idPaciente}/protocolo-actual`, {
    credentials: 'include'
  });

  if (!res.ok) {
    throw new Error(`Error fetching protocolo para el paciente de ID:${idPaciente}`);
  }

  return await res.json();
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

export async function exportRecipe(patientData, type) {
  const res = await fetch(`${API_BASE_URL}/recetas`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patientData),
  });

  if (!res.ok) throw new Error('Error al generar receta');
  const recipeId = await res.json().then(data => data.id);
  const result = await fetch(`${API_BASE_URL}/recetas/${recipeId}/exportar?tipo=${type}`, {
    method: 'GET',
    credentials: 'include'
  });

  return result.blob();
}

