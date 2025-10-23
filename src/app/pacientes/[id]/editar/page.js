'use client';
import React, { useEffect } from 'react';
import { usePatients } from '@/contexts/PatientContext';
import { useHeader } from '@/contexts/HeaderContext';
import { PatientSummaryCard } from '@/components/PatientSummaryCard';
import { PatientEditCard } from '@/components/PatientEditCard';

export default function PatientEditPage({ params }) {
  const { id } = React.use(params);
  const { patients } = usePatients();
  const { setTitle } = useHeader();
  const patient = patients.find((p) => String(p.id) === String(id));

  useEffect(() => {
    setTitle(`Paciente: ${patient.nombre}`);
  }, [setTitle]);

  return (
    <>
      <PatientSummaryCard patient={patient}
        withEditButton={false} />
      <PatientEditCard patient={patient} />
    </>
  );
}
