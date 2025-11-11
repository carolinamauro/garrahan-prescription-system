import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { ContinueButtons } from '@/components/GenerarRecetaSelector/ContinueButtons';
import { Label } from '@/components/ui/label';

export function GenerarRecetaSelector({ paciente }) {
  const id = paciente.paciente_id;
  const router = useRouter();

  const handleContinue = () => {
    router.push(`/pacientes/${id}/generar-receta/medicamentos?ciclos=1`);
  };

  return (
    <div className="px-4 lg:px-6 mt-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Label className="font-semibold text-muted-foreground">
                Cantidad de ciclos a solicitar:
            </Label>
            <Label>1</Label>
          </div>
        </CardContent>
      </Card>

      <ContinueButtons handleContinue={handleContinue} />
    </div>
  );
}
