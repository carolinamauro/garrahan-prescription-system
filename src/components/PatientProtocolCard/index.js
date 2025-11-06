import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TabsProtocolCard } from '@/components/PatientProtocolCard/TabsProtocolCard';
import { ActionButtonsProtocol } from '@/components/PatientProtocolCard/ActionButtonsProtocol';
import { useSelectedPatient } from '@/contexts/SelectedPatientContext';
import { useLogin } from '@/contexts/LoginContext';

function getTextoRegimen(tieneProtocolo, regimen, cambiarRegimen) {
  if (!tieneProtocolo || regimen === null) return '';
  console.log('CAMBIAR REGIMEN:', cambiarRegimen);

  const textoBase = `Régimen ${regimen}`;
  return cambiarRegimen ? `${textoBase} - ES NECESARIO CAMBIAR REGIMEN` : textoBase;
}

export function PatientProtocolCard() {
  const selectedPatient = useSelectedPatient();
  const textoRegimen = getTextoRegimen(
    selectedPatient.hasProtocol,
    selectedPatient.patient.protocolo?.regimen,
    selectedPatient.patient.protocolo?.cambiar_regimen,
  );
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
                <p>{`${textoRegimen}`}</p>
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
