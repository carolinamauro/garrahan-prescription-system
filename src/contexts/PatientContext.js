'use client';
import { createContext, useContext, useState } from 'react';
import data from '../app/pacientes/data.json';

const PatientsContext = createContext();

export function PatientsProvider({ children }) {
  const [patients, setPatients] = useState(data);

  const updatePatient = (id, updates) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  return (
    <PatientsContext.Provider value={{ patients, updatePatient }}>
      {children}
    </PatientsContext.Provider>
  );
}

export const usePatients = () => useContext(PatientsContext);
