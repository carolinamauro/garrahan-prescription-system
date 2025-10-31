import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent, SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useProtocolos } from '@/app/pacientes/new/hooks/useProtocolos';
import { Label } from '@/components/ui/label';

export function GenerarRecetaSelector({ paciente }) {
  const id = paciente.paciente_id;
  const router = useRouter();
  const [selectedCycles, setSelectedCycles] = useState('1');

  const handleContinue = () => {
    router.push(`/pacientes/${id}/generar-receta/medicamentos?ciclos=${selectedCycles}`);
  };

  const { protocolos } = useProtocolos();

  const protocoloSeleccionado = protocolos.find(
    (p) => p.protocolo_id === paciente.protocolo.protocolo_id
  );
  const ciclos = protocoloSeleccionado?.ciclos || [];

  // Ciclos únicos
  const ciclosUnicos = [...new Set(ciclos.map((c) => c.ciclo_id))].map((id) => ({
    ciclo_id: id,
  }));

  return (
    <div className="px-4 lg:px-6 mt-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Label className="font-semibold text-muted-foreground">
                Cantidad de ciclos a solicitar:
            </Label>
            <Select
              onValueChange={(value) => { setSelectedCycles(value); }}
              disabled={!protocoloSeleccionado}
              value={selectedCycles}
            >
              <SelectTrigger>
                <SelectValue>
                  {selectedCycles ? `${selectedCycles}` : 'Seleccionar ciclo'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent position="popper"
                side="bottom"
                align="start"
                avoidCollisions={false}>
                <SelectGroup>
                  {ciclosUnicos.map((c) => (
                    <SelectItem key={c.ciclo_id}
                      value={String(c.ciclo_id)}>
                      {c.ciclo_id}
                    </SelectItem>
                  ))}
                </SelectGroup>
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
