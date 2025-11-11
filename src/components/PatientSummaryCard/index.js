import { Card, CardContent } from '@/components/ui/card';
import { PatientInfoItem } from './PatientInfoItem';
import { useSelectedPatient } from '@/contexts/SelectedPatientContext';
import { formatDate } from '@/lib/utils';
import { EditButton } from '@/components/EditButton';
import { useLogin } from '@/contexts/LoginContext';

export function PatientSummaryCard({ withEditButton }) {
  const { patient } = useSelectedPatient();
  const { loggedIn } = useLogin();

  const infoItems = [
    {
      label: 'Edad',
      value: (patient.anios === null || patient.dias === null)
        ? 'No informa'
        : `${patient.anios} años y ${patient.dias} días`
    },
    {
      label: 'Superficie corporal',
      value: patient?.sup_corporal
        ? `${parseFloat(patient?.sup_corporal, 10).toFixed(8)} m²`
        : 'No informa'
    },
    {
      label: 'Peso (en kg)',
      value: patient.peso,
      note: `Última modificación: ${formatDate(patient.ultima_modificacion)}`
    },
    { label: 'Altura (en cm)', value: patient.altura },
    { label: 'Obra social', value: patient.obra_social },
    { label: 'Historia clínica', value: patient.id_hospitalario },
  ];

  const gridColsClass = withEditButton ? 'md:grid-cols-7' : 'md:grid-cols-6';
  const gridClass = `grid grid-cols-2 gap-3 ${gridColsClass} items-start place-items-center`;

  return (
    <div className="px-4 lg:px-6">
      <h2 className="mb-4 text-xl font-semibold">Información general</h2>
      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardContent className="pt-2">
          <div className={gridClass}>
            {infoItems.map((item, index) => (
              <div key={index}
                className={item.note ? 'flex flex-col' : ''}>
                <PatientInfoItem label={item.label}
                  value={item.value} />
                {item.note &&
                    <span className="text-xs text-muted-foreground mt-1">{item.note}</span>
                }
              </div>
            ))}

            {withEditButton &&
                <EditButton
                  patientId={patient.paciente_id}
                  disabled={!loggedIn}
                />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
