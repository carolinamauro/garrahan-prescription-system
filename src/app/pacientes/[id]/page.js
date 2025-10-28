'use client';
import React, { useEffect } from 'react';
import { PatientSummaryCard } from '@/components/PatientSummaryCard';
import { PatientProtocolCard } from '@/components/PatientProtocolCard';
import { usePatients } from '@/contexts/PatientContext';
import { useHeader } from '@/contexts/HeaderContext';

function pacienteTieneProtocolo(protocolo) {
  return Boolean(
    protocolo &&
        typeof protocolo === 'object' &&
        protocolo.nombre &&
        protocolo.nombre.trim() !== ''
  );
}

export default function PatientPage({ params }) {
  const { id } = React.use(params);
  const { patients } = usePatients();
  const { setTitle, setSubtitle } = useHeader();
  const patient = patients.find((p) => String(p.paciente_id) === String(id));
  const tieneProtocolo = pacienteTieneProtocolo(patient?.protocolo);

  // if (!patient) {
  //   return (
  //     <LoaderPage />
  //   );
  // }

  useEffect(() => {
    setTitle(`${patient.nombre} ${patient.apellido}`);
    setSubtitle('Resumen');
  }, []);

  return (
    <>
      <PatientSummaryCard patient={patient}
        withEditButton={true} />
      <PatientProtocolCard patient={patient}
        tieneProtocolo={tieneProtocolo} />
    </>
  );
}
