import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePatients } from '@/contexts/PatientContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertDialog, AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

// TODO: Refactorizar el código en componentes
export function PatientEditCard({ patient }) {
  const defaultValue = 'No informa';
  const [showDialog, setShowDialog] = useState(false);

  const { updatePatient } = usePatients();
  const [form, setForm] = useState({
    peso: patient.peso || '',
    ultima_mod: patient.ultima_mod || '',
    obra_social: patient.obra_social || '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    form.ultima_mod = new Date();
    await updatePatient(patient.id, form);
    setShowDialog(true);
  };

  const router = useRouter();

  const fields = [
    {
      id: 'peso',
      label: 'Peso',
      placeholder: 'Ingresa el peso del paciente (en kg)',
      savedLabel: 'Peso guardado',
      savedValue: patient.peso || defaultValue,
      hasInput: true,
      form: form.peso
    },
    {
      id: 'superficie',
      label: 'Superficie corporal calculada',
      placeholder: '-',
      savedLabel: null,
      savedValue: patient.sup_corporal || '-',
      hasInput: false
    },
    {
      id: 'obra_social',
      label: 'Obra social',
      placeholder: 'Ingresa obra social del paciente',
      savedLabel: 'Obra social guardada',
      savedValue: patient.obra_social || defaultValue,
      hasInput: true,
      form: form.obra_social
    },
  ];

  return (
    <div className="px-4 lg:px-6">
      <h2 className="mb-4 text-xl font-semibold">Editar</h2>

      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardContent className="pt-2">
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1.5fr]">
            {fields.map(({ id, label, placeholder, savedLabel, savedValue, hasInput, form }) => (
              <div key={id}
                className="space-y-4">
                <div>
                  <Label htmlFor={id}
                    className="text-base font-medium">
                    {label}
                  </Label>
                  {hasInput ? (
                    <Input id={id}
                      placeholder={placeholder}
                      value={form}
                      onChange={handleChange}
                      className="mt-2" />
                  ) : (
                    <p className="mt-2 text-sm text-muted-foreground">{placeholder}</p>
                  )}
                </div>

                {savedLabel && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{savedLabel}</p>
                    <p className="mt-1 text-sm">{savedValue}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="fixed bottom-8 right-6 flex gap-3 px-4 lg:px-4">
        <Button size="lg"
          onClick={handleSave}>
                    Guardar
        </Button>
        <Link href={`/pacientes/${patient.id}`}>
          <Button size="lg"
            variant="outline">
                        Salir
          </Button>
        </Link>
      </div>

      <AlertDialog open={showDialog}
        onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Datos guardados</AlertDialogTitle>
            <AlertDialogDescription>
                        Los datos del paciente se guardaron correctamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => {
              setShowDialog(false);
              router.push(`/pacientes/${patient.id}`);
            }}>
                        Aceptar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
