'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { DataTable } from '@/components/DataTable';
import { getMedicationColumns } from '@/components/DataTable/TableColumns';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { RecetaButtons } from '@/components/RecetaButtons';
import drogas from '@/app/drogas.json';

function shouldEnableExportButton(medications) {
  return medications.every((m) => (m.presentation ?? '') !== '');
}

export default function MedicamentosPage() {
  const searchParams = useSearchParams();
  const cycles = searchParams.get('cycles') || '1';
  const [medications, setMedications] = useState(drogas);
  const [exportBtnDisabled, setExportBtnDisabled] = useState(true);

  const handlePresentationChange = (id, value) => {
    const updated = medications.map((med) =>
      med.id === id ? { ...med, presentation: value } : med
    );
    setMedications(updated);
    setExportBtnDisabled(!shouldEnableExportButton(updated));
  };

  const handleConcentrationChange = (id, value) => {
    const updated = medications.map((med) =>
      med.id === id ? { ...med, concentration: value } : med
    );
    setMedications(updated);
  };

  const handleDelete = (id) => () => {
    setMedications((prev) =>
      prev.filter((med) => med.id !== id)
    );
  };

  const columns = getMedicationColumns(
    handlePresentationChange,
    handleDelete,
    handleConcentrationChange
  );

  return (
    <div className="px-5 lg:px-5">
      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardContent className="pt-2">
          <CardTitle className="mb-6">Cantidad de ciclos: {cycles}</CardTitle>
          <p className="mb-6 text-sm font-medium text-muted-foreground">

          </p>

          <div className="[&_div]:!p-0">
            <DataTable
              data={medications}
              columns={columns}
              withTableColumnSelector={false}
              withActionButtons={false}
              withSelectedRowsCount={false}
              withFooter={false}
              tabsList={[]}
            />
          </div>

          <RecetaButtons exportBtnDisabled={exportBtnDisabled} />

        </CardContent>
      </Card>
    </div>
  );
}
