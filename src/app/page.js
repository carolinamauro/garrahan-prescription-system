'use client';
import { DataTable } from '@/components/DataTable';
import { usePatients } from '@/contexts/PatientContext';
import { useHeader } from '@/contexts/HeaderContext';
import { useEffect } from 'react';

export default function Page() {
  const { patients } = usePatients();
  const { setTitle } = useHeader();

  useEffect(() => {
    setTitle('Pacientes');
  }, [setTitle]);

  return (
    <>
      <DataTable
        data={patients}
        tabsList={[]}
        withActionButtons={true}
      />
    </>
  );
}
