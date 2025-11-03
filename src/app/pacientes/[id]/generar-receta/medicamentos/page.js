'use client';

import { RecetaButtons } from '@/components/RecetaButtons';
import { DataTable } from '@/components/DataTable';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { useHeader } from '@/contexts/HeaderContext';
import { usePatients } from '@/contexts/PatientContext';
import { useSelectedPatient } from '@/contexts/SelectedPatientContext';
import { NotFoundPage } from '@/components/NotFoundPage';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useMedications } from '@/hooks/useMedications';

export default function MedicamentosPage() {
  const { id } = useParams();
  const { setTitle, setSubtitle } = useHeader();
  const { getPatientById } = usePatients();
  const { setPatient, setRecipes } = useSelectedPatient();
  const patient = getPatientById(id);
  const cycles = useSearchParams().get('ciclos') || '1';

  useEffect(() => {
    if (!patient) return;
    setPatient(patient);
    setTitle(`${patient.nombre} ${patient.apellido}`);
    setSubtitle('Generar receta');
  }, [id]);

  if (!patient) return <NotFoundPage />;

  const { loading, medications, handlers, uiState } = useMedications(patient, setRecipes);

  if (loading) return <p className="text-center py-10">Cargando medicamentos...</p>;

  return (
    <div className="px-5 lg:px-5">
      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardContent className="pt-2">
          <CardTitle className="mb-6">Cantidad de ciclos: {cycles}</CardTitle>

          <div className="[&_div]:!p-0">
            <DataTable
              data={medications}
              columns={uiState.columns}
              withTableColumnSelector={false}
              withActionButtons={false}
              withSelectedRowsCount={false}
              withFooter={false}
              tabsList={[]}
            />
          </div>

          <RecetaButtons
            exportBtnDisabled={uiState.exportBtnDisabled}
            onPressExport={handlers.onExport}
          />
        </CardContent>
      </Card>
    </div>
  );
}
