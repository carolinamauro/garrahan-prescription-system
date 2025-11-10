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
      cambiar_regimen: false
    }
  );
  return data;
}

export async function cambiarProtocoloPaciente(
  idPaciente,
  protocoloPacienteId,
  nuevoProtocoloId,
  regimen,
  ciclo
) {
  if (protocoloPacienteId) {
    const { data: dataPatch } = await apiClient.patch(
      `/pacientes/${idPaciente}/protocolos/${protocoloPacienteId}`,
      {
        estado: 'Inactivo'
      }
    );

    if (!dataPatch.actualizado) {
      throw new Error('Error al desactivar el protocolo actual');
    }
  }

  const { data: dataPost } = await apiClient.post(
    `/pacientes/${idPaciente}/protocolos`,
    {
      protocolo_id: nuevoProtocoloId,
      regimen: regimen,
      ciclo_actual_id: ciclo,
      estado: 'Activo',
    }
  );

  // TODO: Si hay un error con el post, activar nuevamente el protocolo anterior

  return dataPost.protocolo_paciente_id;
}
