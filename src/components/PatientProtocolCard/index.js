import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TabsProtocolCard } from '@/components/PatientProtocolCard/TabsProtocolCard';
import { ActionButtonsProtocol } from '@/components/PatientProtocolCard/ActionButtonsProtocol';
import { useState } from 'react';
import { useSelectedPatient } from '@/contexts/SelectedPatientContext';

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

export function PatientProtocolCard() {
  const {patient, hasProtocol, protocol, recipes} = useSelectedPatient();
  const tieneSupCorporal = tieneSuperficieCorporal(patient.sup_corporal);
  const textoRegimen = getTextoRegimen(hasProtocol, patient.protocolo?.regimen);
  const separadorTextos = getSeparadorTextos(hasProtocol,
    protocol?.regimen, protocol?.linea);

  return (
    <div className="px-4 lg:px-6">
      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardHeader>
          <CardTitle>Protocolo de tratamiento</CardTitle>
          <CardDescription className={!hasProtocol ? 'text-red-500' : ''}>
            {hasProtocol ?
              <div>
                <p>{`${protocol.nombre}`}</p>
                <p>{`${lineaNumeroATexto(protocol.linea)} 
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
            tieneProtocolo={hasProtocol}
            tieneSupCorporal={tieneSupCorporal}
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
