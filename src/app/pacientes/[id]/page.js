'use client';
import React, { useEffect, useMemo } from 'react';
import { PatientSummaryCard } from '@/components/PatientSummaryCard';
import { PatientProtocolCard } from '@/components/PatientProtocolCard';
import { usePatients } from '@/contexts/PatientContext';
import { useHeader } from '@/contexts/HeaderContext';
import { useSelectedPatient } from '@/contexts/SelectedPatientContext';
import { NotFoundPage } from '@/components/NotFoundPage';

export default function PatientPage({ params }) {
  const { id } = React.use(params);

  const { getPatientById } = usePatients();
  const { setPatient, patient } = useSelectedPatient();
  const { setTitle, setSubtitle } = useHeader();

  const patientFound = useMemo(() => getPatientById(id), [id, getPatientById]);

  useEffect(() => {

    if (!patientFound) {
      setTitle('');
      setSubtitle('');
      return;
    }

    setTitle(`${patientFound.nombre} ${patientFound.apellido}`);
    setSubtitle('Resumen');
    setPatient(patientFound);
  }, [patientFound, setTitle, setSubtitle, setPatient]);

  if (!patient) {
    return (
      <NotFoundPage />
    );
  }

  return (
    <>
      <PatientSummaryCard withEditButton />
      <PatientProtocolCard />
    </>
  );
}
