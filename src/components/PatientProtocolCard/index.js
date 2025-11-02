import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TabsProtocolCard } from '@/components/PatientProtocolCard/TabsProtocolCard';
import { ActionButtonsProtocol } from '@/components/PatientProtocolCard/ActionButtonsProtocol';
import { useSelectedPatient } from '@/contexts/SelectedPatientContext';

function getTextoRegimen(tieneProtocolo, regimen) {
  return tieneProtocolo && (regimen !== null && regimen !== undefined) ? `Régimen ${regimen}` : '';
}

export function PatientProtocolCard() {
  const selectedPatient = useSelectedPatient();
  const textoRegimen = getTextoRegimen(
    selectedPatient.hasProtocol,
    selectedPatient.patient.protocolo?.regimen
  );

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
          />
          <TabsProtocolCard
            recetasSolicitadas={selectedPatient.recipes}
            tieneProtocolo={selectedPatient.hasProtocol}
          />
        </CardContent>
      </Card>
    </div>
  );
}
