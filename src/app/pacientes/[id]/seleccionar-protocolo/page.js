'use client';
import React, { useEffect } from 'react';
import { usePatients } from '@/contexts/PatientContext';
import { useHeader } from '@/contexts/HeaderContext';
import { PatientProtocolSelection } from '@/components/PatientProtocolSelection';

export default function PatientSelectProtocol({ params }) {
  const { id } = React.use(params);
  const { patients } = usePatients();
  const { setTitle, setSubtitle } = useHeader();
  const patient = patients.find((p) => String(p.id) === String(id));

  useEffect(() => {
    setTitle(`${patient.nombre}`);
    setSubtitle('Protocolo');
  }, []);

  return (
    <>
      <PatientProtocolSelection patient={patient} />
    </>
  );
}
