/* global alert */
'use client';

import { useState } from 'react';
import { createPatient } from '../../../../services/pacientes';
import { usePatients } from '@/contexts/PatientContext';
import moment from 'moment/moment';

export function usePatientCreation() {
  const [showDialog, setShowDialog] = useState(false);
  const { addPatient } = usePatients();

  const createNewPatient = async (patientData) => {
    const payload = {
      ...patientData,
      peso: parseFloat(patientData.peso),
      fecha_inicio: moment(patientData.fecha_inicio).format('YYYY-MM-DD'),
      ciclo_actual_id: patientData.ciclo,
      protocolo_id: patientData.protocolo,
    };

    try {
      const newPatient = await createPatient(payload);

      addPatient(newPatient);
      setShowDialog(true);
      return true;
    } catch {
      alert('Error al crear paciente');
      return false;
    }
  };

  return {
    showDialog,
    setShowDialog,
    createNewPatient
  };
}
