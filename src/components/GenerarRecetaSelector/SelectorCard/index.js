import {
  Select,
  SelectContent, SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useProtocolos } from '@/hooks/useProtocolos';

export function SelectorCard({ paciente, selectedCycles, setSelectedCycles }) {
  const { getProtocoloById } = useProtocolos();
  const protocoloSeleccionado = getProtocoloById(paciente.protocolo.protocolo_id);
  const ciclos = protocoloSeleccionado?.ciclos || [];

  const ciclosUnicos = [...new Set(ciclos.map((c) => c.ciclo_id))].map((id) => ({
    ciclo_id: id,
  }));

  return (
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
        <SelectContent
          position="popper"
          side="bottom"
          align="start"
          avoidCollisions={false}
        >
          <SelectGroup>
            {ciclosUnicos.map((c) => (
              <SelectItem
                key={c.ciclo_id}
                value={String(c.ciclo_id)}
              >
                {c.ciclo_id}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
