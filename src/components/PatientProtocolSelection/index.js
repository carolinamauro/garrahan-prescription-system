'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { useProtocolos } from '@/hooks/useProtocolos';
import { ProtocolSection } from '@/components/ProtocolSection';
import { usePatientForm } from '@/hooks/usePatientForm';
import { EditButtons } from '@/components/EditButtons';
import { AlertPopup } from '@/components/AlertPopup';
import { useProtocolForm } from '@/hooks/useProtocolForm';

export function PatientProtocolSelection({ patient }) {
  const router = useRouter();
  const { form, setForm } = usePatientForm(patient);
  const useProtos = useProtocolos();
  const protocolForm = useProtocolForm(patient);

  const handleSave = async () => {
    await protocolForm.handleSave();
    router.push(`/pacientes/${patient.paciente_id}`);
  };

  return (
    <div className="px-4 lg:px-6">
      <h2 className="mb-4 text-xl font-semibold">Seleccionar protocolo</h2>

      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardContent className="grid gap-6 pt-4">
          <ProtocolSection
            form={form}
            protocolos={useProtos.protocolos}
            onProtocoloChange={(v) => {
              useProtos.setSelectedProtocolo(v);
              protocolForm.setSelectedProtocol(v);
              setForm((f) => ({ ...f, protocolo: v, ciclo: '' }));
            }}
            onRegimenChange={protocolForm.setSelectedRegimen}
            onCicloChange={(v) => {
              setForm((f) => ({ ...f, ciclo: v }));
              protocolForm.setSelectedCiclo(v);
            }}
            withInputPeso={false}
          />
        </CardContent>
      </Card>

      <EditButtons
        handleSave={handleSave}
        href={`/pacientes/${patient.paciente_id}`}
        saveBtnDisabled={form.saveBtnDisabled}
      />

      <AlertPopup
        title="Datos guardados"
        description="El protocolo del paciente se guardó correctamente."
        handleOnClick={() => router.push(`/pacientes/${patient.paciente_id}`)}
        showDialog={form.showDialog}
        setShowDialog={form.setShowDialog}
      />
    </div>
  );
}
