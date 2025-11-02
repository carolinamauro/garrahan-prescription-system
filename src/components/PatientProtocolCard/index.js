import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TabsProtocolCard } from '@/components/PatientProtocolCard/TabsProtocolCard';
import { ActionButtonsProtocol } from '@/components/PatientProtocolCard/ActionButtonsProtocol';
import { useSelectedPatient } from '@/contexts/SelectedPatientContext';

function getTextoRegimen(tieneProtocolo, regimen) {
  return tieneProtocolo && (regimen !== null && regimen !== undefined) ? `Régimen ${regimen}` : '';
}

export function PatientProtocolCard() {
  const { patient, hasProtocol, protocol, recipes, tieneSuperficieCorporal } = useSelectedPatient();
  const textoRegimen = getTextoRegimen(hasProtocol, patient.protocolo?.regimen);

  return (
    <div className="px-4 lg:px-6">
      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardHeader>
          <CardTitle>Protocolo de tratamiento</CardTitle>
          <CardDescription className={!hasProtocol ? 'text-destructive' : ''}>
            {hasProtocol ?
              <div>
                <p>{`${protocol.nombre}`}</p>
                <p>{`${textoRegimen}`}</p>
              </div>
              :
              <p>No tiene protocolo asignado</p>
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ActionButtonsProtocol
            patientId={patient.paciente_id}
            tieneProtocolo={hasProtocol}
            tieneSupCorporal={tieneSuperficieCorporal}
          />
          <TabsProtocolCard
            recetasSolicitadas={recipes}
            tieneProtocolo={hasProtocol}
          />
        </CardContent>
      </Card>
    </div>
  );
}
