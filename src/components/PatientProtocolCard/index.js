import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TabsProtocolCard } from '@/components/PatientProtocolCard/TabsProtocolCard';
import { ActionButtonsProtocol } from '@/components/PatientProtocolCard/ActionButtonsProtocol';
import { useState } from 'react';
import recetas from '../../app/recetas.json';

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
  if (linea === null || linea === undefined) return '';
  return map[linea] || `Línea ${linea}`;
}

function getTextoRegimen(tieneProtocolo, regimen) {
  return tieneProtocolo && (regimen !== null && regimen !== undefined) ? `Régimen ${regimen}` : '';
}

function getSeparadorTextos(tieneProtocolo, regimen, linea) {
  return tieneProtocolo && regimen !== null && regimen !== undefined
    && linea !== null && linea !== undefined ? ' - ' : '';
}

export function PatientProtocolCard({ patient, tieneProtocolo }) {
  const tieneSupCorporal = tieneSuperficieCorporal(patient.sup_corporal);
  const textoRegimen = getTextoRegimen(tieneProtocolo, patient.protocolo.regimen);
  const separadorTextos = getSeparadorTextos(tieneProtocolo,
    patient.protocolo.regimen, patient.protocolo.linea);
  const [recetasSolicitadas] = useState(recetas);

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
            patientId={patient.paciente_id}
            tieneProtocolo={tieneProtocolo}
            tieneSupCorporal={tieneSupCorporal}
          />
          <TabsProtocolCard
            recetasSolicitadas={recetasSolicitadas}
            tieneProtocolo={tieneProtocolo}
          />
        </CardContent>
      </Card>
    </div>
  );
}
