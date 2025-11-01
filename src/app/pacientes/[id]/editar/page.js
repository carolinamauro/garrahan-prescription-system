'use client';
import React, { useEffect, useMemo } from 'react';
import { usePatients } from '@/contexts/PatientContext';
import { useHeader } from '@/contexts/HeaderContext';
import { PatientSummaryCard } from '@/components/PatientSummaryCard';
import { PatientEditCard } from '@/components/PatientEditCard';
import { useSelectedPatient } from '@/contexts/SelectedPatientContext';
import { NotFoundPage } from '@/components/NotFoundPage';

export default function PatientEditPage({ params }) {
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
    setSubtitle('Editar');
    setPatient(patientFound);
  }, [patientFound, setTitle, setSubtitle, setPatient]);

  if (!patient) {
    return (
      <NotFoundPage />
    );
  }

  return (
    <>
      <PatientSummaryCard patient={patient}
        withEditButton={false} />
      <PatientEditCard patient={patient} />
    </>
  );
}
