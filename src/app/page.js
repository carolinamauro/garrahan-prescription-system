'use client';
import { DataTable } from '@/components/DataTable';
import { usePatients } from '@/contexts/PatientContext';
import { useHeader } from '@/contexts/HeaderContext';
import { useEffect } from 'react';
import { getPatientColumns } from '@/components/DataTable/TableColumns';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/contexts/LoginContext';

export default function Page() {
  const { patients } = usePatients();
  const { setTitle, setSubtitle } = useHeader();
  const router = useRouter();
  const { loggedIn } = useLogin();

  useEffect(() => {
    setTitle('Pacientes');
    setSubtitle('Menú principal');
  }, []);

  const handleEdit = (rowId) => () => {
    router.push(`/pacientes/${rowId}/editar`);
  };

  return (
    <>
      <DataTable
        data={patients}
        tabsList={[]}
        withActionButtons={loggedIn}
        columns={getPatientColumns(handleEdit)}
      />
    </>
  );
}
