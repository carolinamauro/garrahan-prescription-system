import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilePen } from 'lucide-react';
import { PatientInfoItem } from './PatientInfoItem';

export function PatientSummaryCard({ patient }) {
  return (
    <div className="px-4 lg:px-6">
      <h2 className="mb-4 text-xl font-semibold">Resumen</h2>
      <Card>
        <CardContent className="pt-2">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-6 place-items-center">
            <PatientInfoItem label="Edad"
              value={`${patient.anios} años y ${patient.dias} días`} />
            <PatientInfoItem label="Peso"
              value={patient.peso} />
            <PatientInfoItem label="Superficie corporal"
              value={patient.sup_corporal} />
            <PatientInfoItem label="Obra social"
              value={patient.obra_social} />
            <PatientInfoItem label="Historia clínica"
              value={patient.historia_clinica} />

            <div className="flex items-end">
              <Button>
                <FilePen className="mr-2 h-4 w-4" />
                                Editar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
