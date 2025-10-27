'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/DataTable';
import { getMedicationColumns } from '@/components/DataTable/TableColumns';
import { IconPlus } from '@tabler/icons-react';
import { Card, CardContent } from '@/components/ui/card';
import drogas from '@/app/drogas.json';

export default function MedicamentosPage() {
  const searchParams = useSearchParams();
  const cycles = searchParams.get('cycles') || '1';

  const [medications, setMedications] = useState(drogas);

  const handlePresentationChange = (id, value) => {
    setMedications((prev) =>
      prev.map((med) => (med.id === id ? { ...med, presentation: value } : med))
    );
  };

  const handleDelete = (id) => {
    setMedications((prev) =>
      prev.filter((med) => med.id !== id)
    );
  };

  const columns = getMedicationColumns(handlePresentationChange, handleDelete);

  return (
    <div className="px-5 lg:px-5">
      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardContent className="pt-2">
          <p className="mb-6 text-sm font-medium text-muted-foreground">
                      Cantidad de ciclos: {cycles}
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

          <div className="mt-6 flex items-center justify-between">
            <Button variant="default"
              size="lg"
              className="bg-blue-600 hover:bg-blue-700">
              <IconPlus className="mr-2 size-5" /> Agregar droga
            </Button>
            <Button variant="default"
              size="lg"
              className="bg-blue-600 hover:bg-blue-700">
                          Exportar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
