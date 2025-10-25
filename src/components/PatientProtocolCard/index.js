import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TabsProtocolCard } from '@/components/PatientProtocolCard/TabsProtocolCard';
import { ActionButtonsProtocol } from '@/components/PatientProtocolCard/ActionButtonsProtocol';

function tieneSuperficieCorporal(sup_corporal) {
  return Boolean(sup_corporal && String(sup_corporal).trim() !== '');
}

function lineaNumeroATexto(linea) {
  const map = {
    1: 'Primera línea',
    2: 'Segunda línea',
    3: 'Tercera línea',
    4: 'Cuarta línea',
    5: 'Quinta línea'
  };
  if (linea === null) return '';
  return map[linea] || `Línea ${linea}`;
}

export function PatientProtocolCard({ patient, tieneProtocolo }) {
  const tieneSupCorporal = tieneSuperficieCorporal(patient.sup_corporal);
  const textoRegimen = patient.protocolo.regimen ? `Régimen ${patient.protocolo.regimen}` : '';
  const separadorTextos = patient.protocolo.regimen && patient.protocolo.linea ? ' - ' : '';

  return (
    <div className="px-4 lg:px-6">
      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardHeader>
          <CardTitle>Protocolo de tratamiento</CardTitle>
          <CardDescription className={!tieneProtocolo ? 'text-red-500' : ''}>
            {tieneProtocolo ?
              <div>
                <p>{`${patient.protocolo.nombre}`}</p>
                <p>{`${lineaNumeroATexto(patient.protocolo.linea)} 
                     ${separadorTextos} 
                     ${textoRegimen}`}</p>
              </div>
              :
              <p>No tiene protocolo asignado</p>
            }
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
