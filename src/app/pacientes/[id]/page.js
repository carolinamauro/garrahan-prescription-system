'use client';
import React, { useEffect } from 'react';
import { PatientSummaryCard } from '@/components/PatientSummaryCard';
import { PatientProtocolCard } from '@/components/PatientProtocolCard';
import { usePatients } from '@/contexts/PatientContext';
import { useHeader } from '@/contexts/HeaderContext';

function pacienteTieneProtocolo(protocolo) {
  return Boolean(protocolo && String(protocolo).trim() !== '');
}

export default function PatientPage({ params }) {
  const { id } = React.use(params);
  const { patients } = usePatients();
  const { setTitle } = useHeader();
  const patient = patients.find((p) => String(p.id) === String(id));
  const tieneProtocolo = pacienteTieneProtocolo(patient.protocolo);

  useEffect(() => {
    setTitle(`Paciente: ${patient.nombre}`);
  }, [setTitle]);

  return (
    <>
      <PatientSummaryCard patient={patient}
        withEditButton={true} />
      <PatientProtocolCard patient={patient}
        tieneProtocolo={tieneProtocolo} />
    </>
  );
}
