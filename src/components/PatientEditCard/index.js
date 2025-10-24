import { Card, CardContent } from '@/components/ui/card';
import { usePatients } from '@/contexts/PatientContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertPopup } from '@/components/AlertPopup';
import { EditButtons } from '@/components/EditButtons';
import { EditFields } from '@/components/PatientEditCard/EditFields';

export function PatientEditCard({ patient }) {
  const [showDialog, setShowDialog] = useState(false);
  const { updatePatient } = usePatients();

  const [form, setForm] = useState({
    peso: patient.peso || '',
    ultima_mod: patient.ultima_mod || '',
    obra_social: patient.obra_social || '',
  });

  const handleSave = async () => {
    form.ultima_mod = new Date();
    await updatePatient(patient.id, form);
    setShowDialog(true);
  };

  const router = useRouter();

  return (
    <div className="px-4 lg:px-6">
      <h2 className="mb-4 text-xl font-semibold">Editar</h2>
      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardContent className="pt-2">
          <EditFields
            form={form}
            setForm={setForm}
            patient={patient}
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
        description="Los datos del paciente se guardaron correctamente."
        handleOnClick={() => {
          router.push(`/pacientes/${patient.id}`);
        }}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </div>
  );
}
