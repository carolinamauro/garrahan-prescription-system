'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { useProtocolos } from '@/app/pacientes/new/hooks/useProtocolos';
import { useProtocolForm } from '@/hooks/useProtocolForm';
import { useState } from 'react';
import SearchProtocol from '@/components/SearchProtocol';
import { EditButtons } from '@/components/EditButtons';
import { AlertPopup } from '@/components/AlertPopup';
import { ProtocolInfo } from '@/components/ProtocolInfo';
import { NotFoundPage } from '@/components/NotFoundPage';

export function PatientProtocolSelection({ patient }) {
  const router = useRouter();
  const { protocolos } = useProtocolos();
  const [showProtocolInfo, setShowProtocolInfo] = useState(false);
  const protocolForm = useProtocolForm(patient);

  if (!patient) return <NotFoundPage />;

  return (
    <div className="px-4 lg:px-6">
      <h2 className="mb-4 text-xl font-semibold">Protocolos de tratamiento</h2>

      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardContent className="pt-2">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted-foreground">
                    Buscar protocolos de tratamiento
            </p>

            <div className="mb-6">
              <SearchProtocol
                placeholder="Buscar protocolos..."
                options={protocolos}
                setSelectedValue={protocolForm.setSelectedProtocol}
                setShowProtocolInfo={setShowProtocolInfo}
                setSaveBtnDisabled={protocolForm.setSaveBtnDisabled}
              />
            </div>

            {showProtocolInfo && (
              <ProtocolInfo
                protocolo={protocolForm.selectedProtocol}
                selectedLine={protocolForm.selectedLine}
                selectedRegimen={protocolForm.selectedRegimen}
                setSelectedLine={protocolForm.setSelectedLine}
                setSelectedRegimen={protocolForm.setSelectedRegimen}
              />
            )}
          </div>
        </CardContent>
      </Card>

      <EditButtons
        handleSave={protocolForm.handleSave}
        href={`/pacientes/${patient.paciente_id}`}
        saveBtnDisabled={protocolForm.saveBtnDisabled}
      />

      <AlertPopup
        title="Datos guardados"
        description="El protocolo del paciente se guardó correctamente."
        handleOnClick={() => router.push(`/pacientes/${patient.paciente_id}`)}
        showDialog={protocolForm.showDialog}
        setShowDialog={protocolForm.setShowDialog}
      />
    </div>
  );
}
