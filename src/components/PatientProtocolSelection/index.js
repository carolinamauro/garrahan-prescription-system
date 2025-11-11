'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { useProtocolos } from '@/hooks/useProtocolos';
import { ProtocolSection } from '@/components/ProtocolSection';
import { EditButtons } from '@/components/EditButtons';
import { AlertPopup } from '@/components/AlertPopup';

export function PatientProtocolSelection({ patient, title, protocolForm }) {
  const router = useRouter();
  const useProtos = useProtocolos();

  const handleSave = async () => {
    await protocolForm.handleSave();
    router.push(`/pacientes/${patient.paciente_id}`);
  };

  return (
    <div className="px-4 lg:px-6">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>

      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardContent className="grid gap-6 pt-4">
          <ProtocolSection
            protocolForm={protocolForm}
            protocolos={useProtos.protocolos}
            onProtocoloChange={(v) => {
              protocolForm.setSelectedProtocol(v);
              protocolForm.setSelectedRegimen('');
              protocolForm.setSelectedCiclo('');
              protocolForm.setSaveBtnDisabled(true);
            }}
            onCicloChange={(v) => {
              protocolForm.setSelectedCiclo(v);
              protocolForm.setSelectedRegimen('');
              protocolForm.setSaveBtnDisabled(true);
            }}
            onRegimenChange={(v) => {
              protocolForm.setSelectedRegimen(v);
              protocolForm.setSaveBtnDisabled(false);
            }}
            withInputPeso={false}
          />
        </CardContent>
      </Card>

      <EditButtons
        handleSave={handleSave}
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
