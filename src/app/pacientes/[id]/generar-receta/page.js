'use client';

import { useEffect } from 'react';
import { usePatients } from '@/contexts/PatientContext';
import { useHeader } from '@/contexts/HeaderContext';
import { GenerarRecetaInfo } from '@/components/GenerarRecetaInfo';
import { GenerarRecetaSelector } from '@/components/GenerarRecetaSelector';
import { useParams } from 'next/navigation';
import { useSelectedPatient } from '@/contexts/SelectedPatientContext';
import { NotFoundPage } from '@/components/NotFoundPage';

export default function GenerarRecetaPage() {
  const { id } = useParams();
  const { setTitle, setSubtitle } = useHeader();
  const { getPatientById } = usePatients();
  const { setPatient } = useSelectedPatient();

  const patient = getPatientById(id);

  useEffect(() => {
    if (!patient) return;
    setPatient(patient);
    setTitle(`${patient.nombre} ${patient.apellido}`);
    setSubtitle('Generar receta');
  }, [patient]);

  if (!patient) return <NotFoundPage />;

  return (
    <div className="flex-1 min-h-screen flex-col p-6 gap-3">
      <GenerarRecetaInfo paciente={patient} />
      <GenerarRecetaSelector paciente={patient} />
    </div>
  );
}
