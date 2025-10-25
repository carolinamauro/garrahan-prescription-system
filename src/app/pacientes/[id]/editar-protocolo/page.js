'use client';

import { Card, CardContent } from '@/components/ui/card';
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { usePatients } from '@/contexts/PatientContext';
import { EditButtons } from '@/components/EditButtons';
import { AlertPopup } from '@/components/AlertPopup';
import { ProtocolInfo } from '@/components/Protocollnfo';
import { useHeader } from '@/contexts/HeaderContext';

export default function PatientEditProtocol({ params }) {
  const { id } = React.use(params);
  const { patients } = usePatients();
  const { setTitle, setSubtitle } = useHeader();
  const patient = patients.find((p) => String(p.id) === String(id));

  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();
  const [selectedLine, setSelectedLine] = useState(patient.protocolo.linea);
  const [selectedRegimen, setSelectedRegimen] = useState(patient.protocolo.regimen);

  useEffect(() => {
    setTitle(`${patient.nombre}`);
    setSubtitle('Editar protocolo');
  }, []);

  const { updatePatient } = usePatients();
  const [form] = useState({
    protocolo: patient.protocolo || '',
  });

  const handleSave = async () => {
    form.protocolo = {
      ...patient.protocolo,
      linea: selectedLine,
      regimen: selectedRegimen,
    };

    await updatePatient(patient.id, form);
    setShowDialog(true);
  };

  return (
    <div className="px-4 lg:px-6">
      <h2 className="mb-4 text-xl font-semibold">Protocolos de tratamiento</h2>

      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardContent>
          <ProtocolInfo
            protocolo={patient.protocolo}
            selectedLine={selectedLine}
            selectedRegimen={selectedRegimen}
            setSelectedLine={setSelectedLine}
            setSelectedRegimen={setSelectedRegimen}
          />
        </CardContent>
      </Card>

      <EditButtons
        handleSave={handleSave}
        href={`/pacientes/${patient.id}`}
        saveBtnDisabled={false}
      />

      <AlertPopup
        title="Datos guardados"
        description="El protocolo del paciente se actualizó correctamente."
        handleOnClick={() => {
          router.push(`/pacientes/${patient.id}`);
        }}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </div>
  );
}
