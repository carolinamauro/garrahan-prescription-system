'use client';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { useHeader } from '@/contexts/HeaderContext';
import { usePatients } from '@/contexts/PatientContext';
import { useSelectedPatient } from '@/contexts/SelectedPatientContext';
import { NotFoundPage } from '@/components/NotFoundPage';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useMedications } from '@/hooks/useMedications';
import { RecetaTypeSelector } from '@/components/RecetaTypeSelector';
import { RecetaProvinciaExtraFields } from '@/components/RecetaProvinciaExtraFields';
import { RecetaButtons } from '@/components/RecetaButtons';
import { DataTable } from '@/components/DataTable';

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

  const useMeds = useMedications(patient, setRecipes);
  if (useMeds.loading) return <p className="text-center py-10">Cargando medicamentos...</p>;

  return (
    <div className="px-5 lg:px-5">
      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardContent className="pt-2 space-y-6">
          <CardTitle>Cantidad de ciclos: {cycles}</CardTitle>

          <RecetaTypeSelector
            value={useMeds.tipoReceta}
            onChange={(v) => {
              useMeds.setTipoReceta(v);
              useMeds.shouldEnableExportButton(useMeds.medications, v);
            }}
          />

          {useMeds.tipoReceta === 'provincia' && (
            <RecetaProvinciaExtraFields values={useMeds.camposExtra}
              onChange={useMeds.setCamposExtra} />
          )}

          <DataTable
            data={useMeds.medications}
            columns={useMeds.uiState.columns}
            withTableColumnSelector={false}
            withActionButtons={false}
            withSelectedRowsCount={false}
            withFooter={false}
          />

          <RecetaButtons
            exportBtnDisabled={useMeds.uiState.exportBtnDisabled}
            onPressExport={useMeds.handlers.onExport}
          />
        </CardContent>
      </Card>
    </div>
  );
}
