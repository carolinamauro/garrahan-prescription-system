'use client';

import { useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { usePatients } from '@/contexts/PatientContext';
import { useHeader } from '@/contexts/HeaderContext';
import { PatientSummaryCard } from '@/components/PatientSummaryCard';
import { PatientEditCard } from '@/components/PatientEditCard';
import { useSelectedPatient } from '@/contexts/SelectedPatientContext';
import { NotFoundPage } from '@/components/NotFoundPage';

export default function PatientEditPage() {
  const { id } = useParams();

  const { getPatientById } = usePatients();
  const { patient, setPatient } = useSelectedPatient();
  const { setTitle, setSubtitle } = useHeader();

  const foundPatient = useMemo(() => getPatientById(id), [id, getPatientById]);

  useEffect(() => {
    if (!foundPatient) {
      setTitle('');
      setSubtitle('');
      return;
    }

    setPatient(foundPatient);
    setTitle(`${foundPatient.nombre} ${foundPatient.apellido}`);
    setSubtitle('Editar');
  }, [foundPatient]);

  if (!patient) return <NotFoundPage />;

  return (
    <>
      <PatientSummaryCard patient={patient}
        withEditButton={false} />
      <PatientEditCard patient={patient} />
    </>
  );
}
