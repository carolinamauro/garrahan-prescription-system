import { Card, CardContent } from '@/components/ui/card';
import { usePatients } from '@/contexts/PatientContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertPopup } from '@/components/AlertPopup';
import { EditButtons } from '@/components/EditButtons';
import { EditFields } from '@/components/PatientEditCard/EditFields';

const calculateBodySurface = (peso, altura) => {
  if (!peso || !altura) return null;
  const pesoNum = parseFloat(peso);
  const alturaCm = parseFloat(altura);
  if (isNaN(pesoNum) || isNaN(alturaCm) || alturaCm <= 0) return null;
  // Fórmula de Mosteller: SC (m²) = √((peso × altura)/3600)
  const superficie = Math.sqrt((pesoNum * alturaCm) / 3600);
  return superficie.toFixed(2);
};

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

    const pesoFinal = form.peso === '' ? patient.peso : form.peso;
    const alturaFinal = form.altura === '' ? patient.altura : form.altura;
    const supCorporal = calculateBodySurface(pesoFinal, alturaFinal);

    const updatedForm = {
      ...form,
      peso: pesoFinal,
      altura: alturaFinal,
      sup_corporal: supCorporal,
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
