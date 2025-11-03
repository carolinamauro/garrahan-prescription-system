'use client';
import { get, isObject } from 'lodash';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const SelectedPatientContext = createContext();

export function SelectedPatientProvider({ children }) {
  const [patient, setPatient] = useState(null);
  const [recipes, setRecipes] = useState([]);

  const patientProtocol = get(patient, 'protocolo', null);
  const patientSupCorp = get(patient, 'sup_corporal', null);
  const patientAltura = get(patient, 'altura', null);

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

  const tieneAltura = useMemo(() => {
    return Boolean(
      patientAltura &&
        String(patientAltura).trim() !== '0'
        && String(patientAltura).trim() !== ''
    );
  }, [patientAltura]);

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
    tieneAltura,
    recipes,
    setRecipes,
    protocol: patientProtocol
  }), [patient, hasProtocol, tieneSuperficieCorporal, recipes, patientProtocol]);

  return (
    <SelectedPatientContext.Provider value={value}>
      {children}
    </SelectedPatientContext.Provider>
  );

}

export const useSelectedPatient = () => useContext(SelectedPatientContext);
