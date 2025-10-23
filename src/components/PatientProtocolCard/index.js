import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TabsProtocolCard } from '@/components/PatientProtocolCard/TabsProtocolCard';
import { ActionButtonsProtocol } from '@/components/PatientProtocolCard/ActionButtonsProtocol';

function tieneSuperficieCorporal(sup_corporal) {
  return Boolean(sup_corporal && String(sup_corporal).trim() !== '');
}

export function PatientProtocolCard({ patient, tieneProtocolo }) {
  const tieneSupCorporal = tieneSuperficieCorporal(patient.sup_corporal);

  return (
    <div className="px-4 lg:px-6">
      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardHeader>
          <CardTitle>Protocolo de tratamiento</CardTitle>
          <CardDescription className={!tieneProtocolo ? 'text-red-500' : ''}>
            {tieneProtocolo ? `${patient.protocolo}` : 'No tiene protocolo asignado'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ActionButtonsProtocol
            patientId={patient.id}
            tieneProtocolo={tieneProtocolo}
            tieneSupCorporal={tieneSupCorporal}
          />
          <TabsProtocolCard />
        </CardContent>
      </Card>
    </div>
  );
}
