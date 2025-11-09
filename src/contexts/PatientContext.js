'use client';

import { createContext, useContext, useCallback } from 'react';
import { useLogin } from '@/contexts/LoginContext';
import { usePatientsSync } from '@/hooks/usePatientsSync';
import { updatePaciente } from '@/services/pacientes';
import { loadPatientWithProtocol } from '@/services/pacientes';

const PatientsContext = createContext();

export function PatientsProvider({ children }) {
  const { loggedIn } = useLogin();
  const {
    patients,
    setPatients,
    loading,
    refreshPatientProtocol
  } = usePatientsSync({ loggedIn });

  const updatePatient = useCallback(async (id, updates) => {
    try {
      if (!updates.protocolo) {
        await updatePaciente(id, updates);
      }

      setPatients((prev) => {
        const updated = prev.map((p) =>
          (p.paciente_id ?? p.id) === id ? {
            ...p,
            ...(updates.protocolo ? { protocolo: updates.protocolo } : updates)
          } : p
        );
        return updated;
      });
    } catch (error) {
      console.error('Error al actualizar el paciente:', error);
      throw error;
    }
  }, [setPatients]);

  const addPatient = useCallback(async (patient) => {
    const updatedPatient = await loadPatientWithProtocol(patient);
    setPatients(prev => [...prev, updatedPatient]);
  }, [setPatients]);

  const getPatientById = useCallback((id) => {
    return patients.find((p) => String(p.paciente_id) === String(id)) || null;
  }, [patients]);

  return (
    <PatientsContext.Provider value={{
      patients,
      updatePatient,
      addPatient,
      loading,
      getPatientById,
      refreshPatientProtocol
    }}>
      {children}
    </PatientsContext.Provider>
  );
}

export const usePatients = () => useContext(PatientsContext);
