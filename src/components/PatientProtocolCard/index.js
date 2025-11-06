import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TabsProtocolCard } from '@/components/PatientProtocolCard/TabsProtocolCard';
import { ActionButtonsProtocol } from '@/components/PatientProtocolCard/ActionButtonsProtocol';
import { useSelectedPatient } from '@/contexts/SelectedPatientContext';
import { useLogin } from '@/contexts/LoginContext';

function getTextoRegimen(tieneProtocolo, regimen, ciclo, cambiarRegimen) {
  if (!tieneProtocolo || regimen === null) return '';

  const textoBase = `Régimen ${regimen} - Ciclo ${ciclo}`;
  return cambiarRegimen ? `${textoBase} -` : textoBase;
}

export function PatientProtocolCard() {
  const selectedPatient = useSelectedPatient();
  const textoRegimen = getTextoRegimen(
    selectedPatient.hasProtocol,
    selectedPatient.patient.protocolo?.regimen,
    selectedPatient.patient.protocolo?.ciclo_actual_id,
    selectedPatient.patient.protocolo?.cambiar_regimen,
  );
  const textoCambiarRegimen = selectedPatient.patient.protocolo?.cambiar_regimen
    ? 'Es necesario cambiar el régimen' : '';
  const { loggedIn } = useLogin();

  return (
    <div className="px-4 lg:px-6">
      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardHeader>
          <CardTitle>Protocolo de tratamiento</CardTitle>
          <CardDescription className={!selectedPatient.hasProtocol ? 'text-destructive' : ''}>
            {selectedPatient.hasProtocol ?
              <div>
                <p>{`${selectedPatient.protocol.nombre}`}</p>
                <div className="flex items-center gap-2">
                  <p>{textoRegimen}</p>
                  <p className={selectedPatient.patient.protocolo?.cambiar_regimen
                    ? 'text-destructive'
                    : ''}>
                    {textoCambiarRegimen}
                  </p>
                </div>
              </div>
              :
              <p>No tiene protocolo asignado</p>
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ActionButtonsProtocol
            patientId={selectedPatient.patient.paciente_id}
            tieneProtocolo={selectedPatient.hasProtocol}
            tieneSupCorporal={selectedPatient.tieneSuperficieCorporal}
            tieneAltura={selectedPatient.tieneAltura}
            cambiarRegimen={selectedPatient.patient.protocolo?.cambiar_regimen}
            loggedIn={loggedIn}
          />
          <TabsProtocolCard
            recetasSolicitadas={selectedPatient.recipes}
            tieneProtocolo={selectedPatient.hasProtocol}
            loggedIn={loggedIn}
          />
        </CardContent>
      </Card>
    </div>
  );
}
