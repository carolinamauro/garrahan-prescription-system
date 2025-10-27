import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export function GenerarRecetaSelector({ pacienteId }) {
  const router = useRouter();
  const [selectedCycles, setSelectedCycles] = useState('1');

  const handleContinue = () => {
    router.push(`/pacientes/${pacienteId}/generar-receta/medicamentos?ciclos=${selectedCycles}`);
  };

  return (
    <div className="px-4 lg:px-6 mt-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <p className="font-semibold text-muted-foreground">Cantidad de ciclos a solicitar:</p>
            <Select value={selectedCycles}
              onValueChange={setSelectedCycles}>
              <SelectTrigger className="w-[13rem]">
                <SelectValue placeholder="Elegir cantidad de ciclos" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <SelectItem key={n}
                    value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end gap-3">
        <Button
          variant="default"
          size="lg"
          onClick={handleContinue}>
                    Continuar
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => router.back()}>
                    Salir
        </Button>
      </div>
    </div>
  );
}
