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
  // TODO: Armar endpoint en el back
  // const { data } = await apiClient.get(`/protocolos/${protocoloId}/ciclos`);
  return [];
}

export async function updateProtocoloPaciente(idPaciente) {
  const { data } = await apiClient.patch(`/pacientes/${idPaciente}/protocolos`);
  return data;
}

export async function updateProtocoloPacienteRegimen(
  idPaciente,
  protocoloPacienteId,
  regimen,
  ciclo
) {
  const { data } = await apiClient.patch(
    `/pacientes/${idPaciente}/protocolos/${protocoloPacienteId}`,
    {
      regimen,
      ciclo_actual_id: ciclo,
      numero_ciclo: ciclo,
      cambiar_regimen: false
    }
  );
  return data;
}
