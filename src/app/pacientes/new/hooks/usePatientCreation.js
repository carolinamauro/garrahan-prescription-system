/* global alert */
'use client';

import { useState } from 'react';
import { createPatient } from '../services/api';
import { usePatients } from '@/contexts/PatientContext';

export function usePatientCreation() {
  const [showDialog, setShowDialog] = useState(false);
  const { addPatient } = usePatients();

  const createNewPatient = async (patientData) => {
    const payload = {
      ...patientData,
      peso: parseFloat(patientData.peso),
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
