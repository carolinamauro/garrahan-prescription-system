import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePatients } from '@/contexts/PatientContext';
import SearchProtocol from '@/components/SearchProtocol';
import { EditButtons } from '@/components/EditButtons';
import { AlertPopup } from '@/components/AlertPopup';
import { useProtocolos } from '@/app/pacientes/new/hooks/useProtocolos';

export function PatientProtocolSelection({ patient }) {
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();
  const { protocolos} = useProtocolos();
  const [searchValue, setSearchValue] = useState('');

  const { updatePatient } = usePatients();
  const [form] = useState({
    protocolo: patient.protocolo || '',
  });

  const handleSave = async () => {
    form.protocolo = searchValue;
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

            <SearchProtocol
              placeholder="Buscar protocolos..."
              options={protocolos}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </div>
        </CardContent>
      </Card>

      <EditButtons
        handleSave={handleSave}
        href={`/pacientes/${patient.id}`}
      />

      <AlertPopup
        title="Datos guardados"
        description="El protocolo del paciente se guardó correctamente."
        handleOnClick={() => {
          setSearchValue('');
          router.push(`/pacientes/${patient.id}`);
        }}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </div>
  );
}
