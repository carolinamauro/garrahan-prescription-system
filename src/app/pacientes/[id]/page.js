'use client';
import React, { useEffect, useMemo } from 'react';
import { PatientSummaryCard } from '@/components/PatientSummaryCard';
import { PatientProtocolCard } from '@/components/PatientProtocolCard';
import { usePatients } from '@/contexts/PatientContext';
import { useHeader } from '@/contexts/HeaderContext';
import { useSelectedPatient } from '@/contexts/SelectedPatientContext';
import { NotFoundPage } from '@/components/NotFoundPage';

export default function PatientPage({ params }) {
  const { id } = React.use(params);
  const { getPatientById, refreshPatientProtocol } = usePatients();
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
    setSubtitle('Resumen');
    setPatient(patientFound);
  }, [patientFound, setTitle, setSubtitle, setPatient]);

  useEffect(() => {
    let didRun = false;

    async function refreshProtocol() {
      if (didRun) return;
      didRun = true;

      if (id) {
        const updatedPatient = await refreshPatientProtocol(id);
        if (updatedPatient) {
          setPatient(updatedPatient);
        }
      }
    }

    refreshProtocol();
  }, []);

  if (!patient) {
    return <NotFoundPage />;
  }

  const tieneProtocolo = Boolean(
    patient.protocolo &&
    typeof patient.protocolo === 'object' &&
    patient.protocolo.nombre &&
    patient.protocolo.nombre.trim() !== ''
  );

  return (
    <>
      <PatientSummaryCard
        patient={patient}
        withEditButton
      />
      <PatientProtocolCard
        patient={patient}
        tieneProtocolo={tieneProtocolo}
      />
    </>
  );
}
