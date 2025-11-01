'use client';

import { useState, useCallback } from 'react';
import { usePatients } from '@/contexts/PatientContext';
import { useSelectedPatient } from '@/contexts/SelectedPatientContext';

export function useProtocolForm(patient) {
  const { updatePatient } = usePatients();
  const { setPatient } = useSelectedPatient();

  const [selectedProtocol, setSelectedProtocol] = useState(patient?.protocolo ?? null);
  const [selectedLine, setSelectedLine] = useState(patient?.protocolo?.linea ?? 1);
  const [selectedRegimen, setSelectedRegimen] = useState(patient?.protocolo?.regimen ?? 1);
  const [showDialog, setShowDialog] = useState(false);
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true);

  const handleSave = useCallback(async () => {
    if (!patient) return;

    const updatedProtocolo = {
      ...selectedProtocol,
      linea: selectedLine,
      regimen: selectedRegimen,
    };

    try {
      await updatePatient(patient.paciente_id, { protocolo: updatedProtocolo });
      setPatient({ ...patient, protocolo: updatedProtocolo });
      setShowDialog(true);
    } catch (error) {
      console.error('Error al actualizar el paciente:', error);
    }
  }, [patient, selectedProtocol, selectedLine, selectedRegimen, updatePatient, setPatient]);

  return {
    selectedProtocol,
    setSelectedProtocol,
    selectedLine,
    setSelectedLine,
    selectedRegimen,
    setSelectedRegimen,
    showDialog,
    setShowDialog,
    saveBtnDisabled,
    setSaveBtnDisabled,
    handleSave,
  };
}
