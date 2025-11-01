'use client';
import { useEffect } from 'react';
import { usePatients } from '@/contexts/PatientContext';
import { useHeader } from '@/contexts/HeaderContext';
import { PatientProtocolSelection } from '@/components/PatientProtocolSelection';
import { useParams } from 'next/navigation';
import { useSelectedPatient } from '@/contexts/SelectedPatientContext';
import { NotFoundPage } from '@/components/NotFoundPage';

export default function PatientSelectProtocol() {
  const { id } = useParams();
  const { setTitle, setSubtitle } = useHeader();
  const { getPatientById } = usePatients();
  const { setPatient } = useSelectedPatient();

  const patient = getPatientById(id);

  useEffect(() => {
    if (!patient) return;
    setPatient(patient);
    setTitle(`${patient.nombre} ${patient.apellido}`);
    setSubtitle('Protocolo');
  }, [patient]);

  if (!patient) return <NotFoundPage />;

  return (
    <>
      <PatientProtocolSelection patient={patient} />
    </>
  );
}
