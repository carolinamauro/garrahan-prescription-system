import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePatients } from '@/contexts/PatientContext';
import SearchProtocol from '@/components/SearchProtocol';
import { EditButtons } from '@/components/EditButtons';
import { AlertPopup } from '@/components/AlertPopup';
import { useProtocolos } from '@/app/pacientes/new/hooks/useProtocolos';
import { ProtocolInfo } from '@/components/Protocollnfo';

export function PatientProtocolSelection({ patient }) {
  const [showDialog, setShowDialog] = useState(false);
  const [showProtocolInfo, setShowProtocolInfo] = useState(false);
  const router = useRouter();
  const { protocolos} = useProtocolos();
  const [selectedProtocol, setSelectedProtocol] = useState('');
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true);
  const [selectedLine, setSelectedLine] = useState(1);
  const [selectedRegimen, setSelectedRegimen] = useState(1);

  const { updatePatient } = usePatients();
  const [form] = useState({
    protocolo: patient.protocolo || '',
  });

  const handleSave = async () => {
    form.protocolo = {
      ...selectedProtocol,
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
        <CardContent className="pt-2">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted-foreground">
                    Buscar protocolos de tratamiento
            </p>

            <div className="mb-6">
              <SearchProtocol
                placeholder="Buscar protocolos..."
                options={protocolos}
                setSelectedValue={setSelectedProtocol}
                setShowProtocolInfo={setShowProtocolInfo}
                setSaveBtnDisabled={setSaveBtnDisabled}
              />
            </div>

            {showProtocolInfo && (
              <ProtocolInfo
                protocolo={selectedProtocol}
                selectedLine={selectedLine}
                selectedRegimen={selectedRegimen}
                setSelectedLine={setSelectedLine}
                setSelectedRegimen={setSelectedRegimen}
              />
            )}
          </div>
        </CardContent>
      </Card>

      <EditButtons
        handleSave={handleSave}
        href={`/pacientes/${patient.id}`}
        saveBtnDisabled={saveBtnDisabled}
      />

      <AlertPopup
        title="Datos guardados"
        description="El protocolo del paciente se guardó correctamente."
        handleOnClick={() => {
          router.push(`/pacientes/${patient.id}`);
        }}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </div>
  );
}
