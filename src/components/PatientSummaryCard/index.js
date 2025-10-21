import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilePen } from 'lucide-react';
import { PatientInfoItem } from './PatientInfoItem';
import Link from 'next/link';

export function PatientSummaryCard({ patient, withEditButton }) {
  const gridColsClass = withEditButton ? 'md:grid-cols-6' : 'md:grid-cols-5';
  const gridClass = `grid grid-cols-2 gap-3 ${gridColsClass} place-items-center`;

  return (
    <div className="px-4 lg:px-6">
      <h2 className="mb-4 text-xl font-semibold">Resumen</h2>
      <Card>
        <CardContent className="pt-2">
          <div className={gridClass}>
            <PatientInfoItem label="Edad"
              value={`${patient.anios} años y ${patient.dias} días`} />
            <PatientInfoItem label="Peso (en kg)"
              value={patient.peso} />
            <PatientInfoItem label="Superficie corporal"
              value={patient.sup_corporal} />
            <PatientInfoItem label="Obra social"
              value={patient.obra_social} />
            <PatientInfoItem label="Historia clínica"
              value={patient.historia_clinica} />

            {withEditButton && (
              <div className="flex items-end">
                <Button>
                  <Link href={`/pacientes/${patient.id}/editar`}
                    className="flex items-center gap-2"
                    aria-label={`${patient.nombre} - Editar`}>
                    <FilePen className="mr-2 h-4 w-4" />
                              Editar
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
