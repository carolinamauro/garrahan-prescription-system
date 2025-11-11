import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { AlertPopup } from '@/components/AlertPopup';
import { EditButtons } from '@/components/EditButtons';
import { EditFields } from '@/components/PatientEditCard/EditFields';
import { usePatientForm } from '@/hooks/usePatientForm';

export function PatientEditCard({ patient }) {
  const router = useRouter();
  const { form, setForm, handleSave, showDialog, setShowDialog } = usePatientForm(patient);

  return (
    <div className="px-4 lg:px-6">
      <h2 className="mb-4 text-xl font-semibold">Editar</h2>
      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardContent className="pt-2">
          <EditFields form={form}
            setForm={setForm}
            patient={patient} />
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
        handleOnClick={() => router.push(`/pacientes/${patient.paciente_id}`)}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </div>
  );
}
