/* global fetch */

import { API_BASE_URL } from '.';

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
