'use client';

import { useState, useCallback } from 'react';
import { usePatients } from '@/contexts/PatientContext';
import { useSelectedPatient } from '@/contexts/SelectedPatientContext';
import { cambiarProtocoloPaciente, updateProtocoloPacienteRegimen } from '@/services/protocolos';

export function useProtocolForm(patient) {
  const { updatePatient } = usePatients();
  const { setPatient } = useSelectedPatient();

  const [selectedProtocol, setSelectedProtocol] = useState(patient?.protocolo ?? null);
  const [selectedRegimen, setSelectedRegimen] = useState(patient?.protocolo?.regimen ?? 1);
  const [selectedCiclo, setSelectedCiclo] = useState(patient?.protocolo?.ciclo_actual_id ?? 1);
  const [showDialog, setShowDialog] = useState(false);
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(false);

  const handleSave = useCallback(async () => {
    if (!patient) return;

    try {
      let updatedProtocolo;

      if (!patient.protocolo ||
          Number(selectedProtocol) !== Number(patient.protocolo.protocolo_id)) {
        updatedProtocolo = await cambiarProtocoloPaciente(
          patient.paciente_id,
          patient.protocolo?.protocoloPacienteId,
          selectedProtocol,
          selectedRegimen,
          selectedCiclo
        );

        patient.protocolo.protocoloPacienteId = updatedProtocolo;
      } else {
        updatedProtocolo = await updateProtocoloPacienteRegimen(
          patient.paciente_id,
          patient.protocolo.protocoloPacienteId,
          selectedRegimen,
          selectedCiclo
        );
      }

      // Creamos el protocolo actualizado
      const newProtocolo = {
        ...patient.protocolo,
        ...updatedProtocolo,
        regimen: selectedRegimen,
        ciclo_actual_id: selectedCiclo
      };

      // Actualizamos tanto el paciente seleccionado como el estado global
      const updatedPatient = { ...patient, protocolo: newProtocolo };
      setPatient(updatedPatient);

      // También actualizamos el estado global de pacientes para mantener la consistencia
      updatePatient(patient.paciente_id, { protocolo: newProtocolo });

      setShowDialog(true);
    } catch (error) {
      console.error('Error al actualizar el régimen del paciente:', error);
      alert('Error al actualizar el régimen del paciente');
    }
  }, [patient, selectedRegimen, updatePatient, setPatient]);

  return {
    selectedProtocol,
    setSelectedProtocol,
    selectedRegimen,
    setSelectedRegimen,
    selectedCiclo,
    setSelectedCiclo,
    showDialog,
    setShowDialog,
    saveBtnDisabled,
    setSaveBtnDisabled,
    handleSave,
  };
}
