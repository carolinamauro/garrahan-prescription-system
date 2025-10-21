import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function PatientEditCard({ patient }) {
  const defaultValue = 'No informa';

  const fields = [
    {
      id: 'peso',
      label: 'Peso',
      placeholder: 'Ingresa el peso del paciente (en kg)',
      savedLabel: 'Peso guardado',
      savedValue: patient.peso || defaultValue,
      hasInput: true
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
      id: 'obra-social',
      label: 'Obra social',
      placeholder: 'Ingresa obra social del paciente',
      savedLabel: 'Obra social guardada',
      savedValue: patient.obra_social || defaultValue,
      hasInput: true
    },
  ];

  return (
    <div className="px-4 lg:px-6">
      <h2 className="mb-4 text-xl font-semibold">Editar</h2>

      <Card>
        <CardContent className="pt-2">
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1.5fr]">
            {fields.map(({ id, label, placeholder, savedLabel, savedValue, hasInput }) => (
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
      <div className="fixed bottom-6 right-6 flex gap-3 px-4 lg:px-2">
        <Button size="lg">
                    Guardar
        </Button>
        <Link href={`/pacientes/${patient.id}`}>
          <Button size="lg"
            variant="outline">
                        Salir
          </Button>
        </Link>
      </div>
    </div>
  );
}
