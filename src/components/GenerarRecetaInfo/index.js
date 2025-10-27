import { Card, CardContent } from '@/components/ui/card';
import { PatientInfoItem } from '../PatientSummaryCard/PatientInfoItem';

export function GenerarRecetaInfo({ paciente }) {
  const gridClass = 'grid grid-cols-2 gap-3 md:grid-cols-3 items-start place-items-center';

  return (
    <div className="px-4 lg:px-6">
      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardContent className="pt-2">
          <div className={gridClass}>
            <PatientInfoItem label="Cantidad de ciclos ya solicitados"
              value={paciente.protocolo.ciclos.length} />
            <PatientInfoItem label="Protocolo aplicado"
              value={paciente.protocolo.nombre} />
            <PatientInfoItem label="Historia clínica"
              value={paciente.sup_corporal} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
