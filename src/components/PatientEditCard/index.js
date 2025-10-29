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
    altura: patient.altura || '',
    ultima_modificacion: patient.ultima_modificacion || '',
    obra_social: patient.obra_social || '',
  });

  const handleSave = async () => {
    const pesoCambiado = form.peso !== '' && form.peso !== patient.peso;
    const alturaCambiada = form.altura !== '' && form.altura !== patient.altura;
    const datosModificados = pesoCambiado || alturaCambiada;

    const updatedForm = {
      ...form,
      peso: form.peso === '' ? patient.peso : form.peso,
      altura: form.altura === '' ? patient.altura : form.altura,
      obra_social: form.obra_social === '' ? patient.obra_social : form.obra_social,
      ultima_modificacion: datosModificados ? new Date() : patient.ultima_modificacion,
    };

    await updatePatient(patient.paciente_id, updatedForm);
    setForm(updatedForm);
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
        href={`/pacientes/${patient.paciente_id}`}
        saveBtnDisabled={false}
      />

      <AlertPopup
        title="Datos guardados"
        description="Los datos del paciente se guardaron correctamente."
        handleOnClick={() => {
          router.push(`/pacientes/${patient.paciente_id}`);
        }}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </div>
  );
}
