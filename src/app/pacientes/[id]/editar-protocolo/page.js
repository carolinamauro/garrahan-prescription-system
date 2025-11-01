'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useHeader } from '@/contexts/HeaderContext';
import { usePatients } from '@/contexts/PatientContext';
import { useSelectedPatient } from '@/contexts/SelectedPatientContext';
import { ProtocolInfo } from '@/components/ProtocolInfo';
import { EditButtons } from '@/components/EditButtons';
import { AlertPopup } from '@/components/AlertPopup';
import { NotFoundPage } from '@/components/NotFoundPage';
import { useProtocolForm } from '@/hooks/useProtocolForm';

export default function PatientEditProtocolPage() {
  const { id } = useParams();
  const router = useRouter();
  const { setTitle, setSubtitle } = useHeader();
  const { getPatientById } = usePatients();
  const { setPatient } = useSelectedPatient();

  const patient = getPatientById(id);

  const protocolForm = useProtocolForm(patient);

  useEffect(() => {
    if (!patient) return;
    setPatient(patient);
    setTitle(`${patient.nombre} ${patient.apellido}`);
    setSubtitle('Editar protocolo');
  }, [patient, setPatient, setTitle, setSubtitle]);

  if (!patient) return <NotFoundPage />;

  return (
    <div className="px-4 lg:px-6">
      <h2 className="mb-4 text-xl font-semibold">Protocolos de tratamiento</h2>

      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardContent>
          <ProtocolInfo
            protocolo={protocolForm.selectedProtocol || patient.protocolo}
            selectedLine={protocolForm.selectedLine}
            selectedRegimen={protocolForm.selectedRegimen}
            setSelectedLine={protocolForm.setSelectedLine}
            setSelectedRegimen={protocolForm.setSelectedRegimen}
          />
        </CardContent>
      </Card>

      <EditButtons
        handleSave={protocolForm.handleSave}
        href={`/pacientes/${patient.paciente_id}`}
        saveBtnDisabled={false}
      />

      <AlertPopup
        title="Datos guardados"
        description="El protocolo del paciente se actualizó correctamente."
        handleOnClick={() => router.push(`/pacientes/${patient.paciente_id}`)}
        showDialog={protocolForm.showDialog}
        setShowDialog={protocolForm.setShowDialog}
      />
    </div>
  );
}
