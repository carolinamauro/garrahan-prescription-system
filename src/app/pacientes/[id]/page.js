'use client';
import React, { useEffect, useMemo } from 'react';
import { PatientSummaryCard } from '@/components/PatientSummaryCard';
import { PatientProtocolCard } from '@/components/PatientProtocolCard';
import { usePatients } from '@/contexts/PatientContext';
import { useHeader } from '@/contexts/HeaderContext';
import { useSelectedPatient } from '@/contexts/SelectedPatientContext';

export default function PatientPage({ params }) {
  const { id } = React.use(params);

  const { getPatientById } = usePatients();
  const { setPatient, patient } = useSelectedPatient();
  const { setTitle, setSubtitle } = useHeader();

  const patientFound = useMemo(() => getPatientById(id), [id, getPatientById]);

  useEffect(() => {

    if (!patientFound) {
      setTitle('Paciente no encontrado');
      setSubtitle('');
      return;
    }

    setTitle(`${patientFound.nombre} ${patientFound.apellido}`);
    setSubtitle('Resumen');
    setPatient(patientFound);
  }, [patientFound, setTitle, setSubtitle, setPatient]);

  if (!patient) {
    return (
      <div className="px-4 lg:px-6">
        <p className="text-red-500">Paciente no encontrado.</p>
      </div>
    );
  }

  return (
    <>
      <PatientSummaryCard withEditButton />
      <PatientProtocolCard />
    </>
  );
}
