'use client';
import { DataTable } from '@/components/DataTable';
import { usePatients } from '@/contexts/PatientContext';
import { useHeader } from '@/contexts/HeaderContext';
import { useEffect } from 'react';
import { getPatientColumns } from '@/components/DataTable/TableColumns';

export default function Page() {
  const { patients } = usePatients();
  const { setTitle, setSubtitle } = useHeader();

  useEffect(() => {
    setTitle('Pacientes');
    setSubtitle('Menú Principal');
  }, []);

  return (
    <>
      <DataTable
        data={patients}
        tabsList={[]}
        withActionButtons={true}
        columns={getPatientColumns()}
      />
    </>
  );
}
