'use client';

import React, { useEffect } from 'react';
import { usePatients } from '@/contexts/PatientContext';
import { useHeader } from '@/contexts/HeaderContext';
import { GenerarRecetaInfo } from '@/components/GenerarRecetaInfo';
import { GenerarRecetaSelector } from '@/components/GenerarRecetaSelector';

export default function GenerarRecetaPage({ params }) {
  const { id } = React.use(params);
  const { patients } = usePatients();
  const { setTitle, setSubtitle } = useHeader();
  const patient = patients.find((p) => String(p.id) === String(id));

  useEffect(() => {
    setTitle(`${patient.nombre}`);
    setSubtitle('Generar receta');
  }, []);

  return (
    <div className="flex-1 min-h-screen flex-col p-6 gap-3">
      <GenerarRecetaInfo paciente={patient} />
      <GenerarRecetaSelector pacienteId={id} />
    </div>
  );
}
