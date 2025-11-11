'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useHeader } from '@/contexts/HeaderContext';
import { usePatients } from '@/contexts/PatientContext';
import { useSelectedPatient } from '@/contexts/SelectedPatientContext';
import { useProtocolForm } from '@/hooks/useProtocolForm';
import { NotFoundPage } from '@/components/NotFoundPage';
import { PatientProtocolSelection } from '@/components/PatientProtocolSelection';

export default function PatientEditProtocolPage() {
  const { id } = useParams();
  const { setTitle, setSubtitle } = useHeader();
  const { getPatientById } = usePatients();
  const { setPatient } = useSelectedPatient();

  const patient = getPatientById(id);

  useEffect(() => {
    if (!patient) return;
    setPatient(patient);
    setTitle(`${patient.nombre} ${patient.apellido}`);
    setSubtitle('Editar protocolo');
  }, [patient]);

  if (!patient) return <NotFoundPage />;

  const protocolForm = useProtocolForm(patient, true);

  return (
    <PatientProtocolSelection
      patient={patient}
      title={'Editar protocolo'}
      protocolForm={protocolForm}
    />
  );
}
