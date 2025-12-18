'use client';
import { DataTable } from '@/components/DataTable';
import { usePatients } from '@/contexts/PatientContext';
import { useHeader } from '@/contexts/HeaderContext';
import { useEffect } from 'react';
import { getPatientColumns } from '@/components/DataTable/TableColumns';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/contexts/LoginContext';
import AdminProtocol from '@/components/AdminProtocol';

export default function Page() {
  const { patients } = usePatients();
  const { setTitle, setSubtitle } = useHeader();
  const router = useRouter();
  const { loggedIn, isAdmin } = useLogin();

  useEffect(() => {
    if (isAdmin) {
      setTitle('Administración de Pacientes');
      setSubtitle('Menú principal - Administrador');
    } else {
      setTitle('Pacientes');
      setSubtitle('Menú principal');
    }
  }, [isAdmin]);

  const handleEdit = (rowId) => () => {
    router.push(`/pacientes/${rowId}/editar`);
  };

  return (
    isAdmin ? <AdminProtocol /> : <DataTable
      data={patients}
      tabsList={[]}
      withActionButtons={loggedIn}
      columns={getPatientColumns(handleEdit)}
    />

  );
}
