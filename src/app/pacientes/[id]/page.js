'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { PatientSummaryCard } from '@/components/PatientSummaryCard';
import { PatientProtocolCard } from '@/components/PatientProtocolCard';
import { usePatients } from '@/contexts/PatientContext';
import { useHeader } from '@/contexts/HeaderContext';
import { useSelectedPatient } from '@/contexts/SelectedPatientContext';
import { NotFoundPage } from '@/components/NotFoundPage';
import { fetchProtocoloPaciente } from '@/services/protocolos';
import { useLogin } from '@/contexts/LoginContext';

export default function PatientPage({ params }) {
  const { id } = React.use(params);
  const [protocolo, setProtocolo] = useState(null);

  const { getPatientById } = usePatients();
  const { setPatient, patient } = useSelectedPatient();
  const { setTitle, setSubtitle } = useHeader();
  const { loggedIn } = useLogin();

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
    async function loadProtocolo() {
      if (id) {
        try {
          const protocoloData = await fetchProtocoloPaciente(id);
          setProtocolo(protocoloData);
        } catch (error) {
          console.error('Error al cargar el protocolo:', error);
        }
      }
    }

    if (loggedIn) {
      loadProtocolo();
    }
  }, [id]);

  if (!patient) {
    return (
      <NotFoundPage />
    );
  }

  return (
    <>
      <PatientSummaryCard withEditButton />
      <PatientProtocolCard protocolo={protocolo} />
    </>
  );
}
