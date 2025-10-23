/* global alert */
'use client';

import { useState } from 'react';
import { createPatient } from '../services/api';

export function usePatientCreation() {
  const [showDialog, setShowDialog] = useState(false);

  const createNewPatient = async (patientData) => {
    const payload = {
      ...patientData,
      peso: parseFloat(patientData.peso),
    };

    try {
      await createPatient(payload);
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
