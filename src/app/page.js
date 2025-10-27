'use client';
import { DataTable } from '@/components/DataTable';
import { usePatients } from '@/contexts/PatientContext';
import { useHeader } from '@/contexts/HeaderContext';
import { useEffect } from 'react';
import { getPatientColumns } from '@/components/DataTable/TableColumns';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { patients } = usePatients();
  const { setTitle, setSubtitle } = useHeader();
  const router = useRouter();

  useEffect(() => {
    setTitle('Pacientes');
    setSubtitle('Menú Principal');
  }, []);

  const handleEdit = (rowId) => () => {
    router.push(`/pacientes/${rowId}/editar`);
  };

  return (
    <>
      <DataTable
        data={patients}
        tabsList={[]}
        withActionButtons={true}
        columns={getPatientColumns(handleEdit)}
      />
    </>
  );
}
