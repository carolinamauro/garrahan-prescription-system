'use client';
import { get, isObject } from 'lodash';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const SelectedPatientContext = createContext();

export function SelectedPatientProvider({ children }) {
  const [patient, setPatient] = useState(null);
  const [recipes, setRecipes] = useState([]);

  const patientProtocol = get(patient, 'protocolo', null);

  const hasProtocol = useMemo(() => {
    return Boolean(
      patientProtocol &&
          isObject(patientProtocol) &&
          patientProtocol.nombre &&
          patientProtocol.nombre.trim() !== ''
    );
  }, [patientProtocol]);

  useEffect(() => {
    if (patient && isObject(patient)) {
      const fetchedRecipes = get(patient, 'recetas', []);
      setRecipes(fetchedRecipes);
    } else {
      setRecipes([]);
    }
  }, [patient]);

  const value = useMemo(() => ({
    patient,
    setPatient,
    hasProtocol,
    recipes,
    protocol: patientProtocol
  }), [patient, hasProtocol, recipes, patientProtocol]);

  return (
    <SelectedPatientContext.Provider value={value}>
      {children}
    </SelectedPatientContext.Provider>
  );

}

export const useSelectedPatient = () => useContext(SelectedPatientContext);
