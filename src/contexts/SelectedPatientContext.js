'use client';
import { get, isObject } from 'lodash';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const SelectedPatientContext = createContext();

export function SelectedPatientProvider({ children }) {
  const [patient, setPatient] = useState(null);
  const [recipes, setRecipes] = useState([]);

  const patientProtocol = get(patient, 'protocolo', null);
  const patientSupCorp = get(patient, 'sup_corporal', null);

  const hasProtocol = useMemo(() => {
    return Boolean(
      patientProtocol &&
          isObject(patientProtocol) &&
          patientProtocol.nombre &&
          patientProtocol.nombre.trim() !== ''
    );
  }, [patientProtocol]);

  const tieneSuperficieCorporal = useMemo(() => {
    return Boolean(patientSupCorp && String(patientSupCorp).trim() !== '');
  }, [patientSupCorp]);

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
    tieneSuperficieCorporal,
    recipes,
    protocol: patientProtocol
  }), [patient, hasProtocol, tieneSuperficieCorporal, recipes, patientProtocol]);

  return (
    <SelectedPatientContext.Provider value={value}>
      {children}
    </SelectedPatientContext.Provider>
  );

}

export const useSelectedPatient = () => useContext(SelectedPatientContext);
