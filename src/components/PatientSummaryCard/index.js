import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilePen } from 'lucide-react';
import { PatientInfoItem } from './PatientInfoItem';
import Link from 'next/link';

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export function PatientSummaryCard({ patient, withEditButton }) {
  const gridColsClass = withEditButton ? 'md:grid-cols-6' : 'md:grid-cols-5';
  const gridClass = `grid grid-cols-2 gap-3 ${gridColsClass} items-start place-items-center`;

  return (
    <div className="px-4 lg:px-6">
      <h2 className="mb-4 text-xl font-semibold">Información general</h2>
      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardContent className="pt-2">
          <div className={gridClass}>
            <PatientInfoItem
              label="Edad"
              value={patient.anios === null || patient.dias === null
                ? 'No informa' : `${patient.anios} años y ${patient.dias} días`}
            />
            <div className="flex flex-col">
              <PatientInfoItem label="Peso (en kg)"
                value={patient.peso} />
              <span className="text-xs text-muted-foreground mt-1">
                Última modificación: {formatDate(patient.ultima_modificacion)}
              </span>
            </div>
            <PatientInfoItem label="Superficie corporal"
              value={patient.sup_corporal} />
            <PatientInfoItem label="Obra social"
              value={patient.obra_social} />
            <PatientInfoItem label="Historia clínica"
              value={patient.historia_clinica} />

            {withEditButton && (
              <div className="flex items-end">
                <Button>
                  <Link
                    href={`/pacientes/${patient.paciente_id}/editar`}
                    className="flex items-center gap-2"
                    aria-label={`${patient.paciente_id} - Editar`}
                  >
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
