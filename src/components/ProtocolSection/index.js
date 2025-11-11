'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from '@/components/ui/select';

export function ProtocolSection({
  form,
  protocolForm,
  protocolos,
  onProtocoloChange,
  onCicloChange,
  onRegimenChange,
  onPesoChange,
  withInputPeso = true,
}) {
  const protocoloSeleccionado = protocolos.find(
    (p) => p.protocolo_id === Number(protocolForm.selectedProtocol)
  );
  const ciclos = protocoloSeleccionado?.ciclos || [];

  // Ciclos únicos
  const ciclosUnicos = [...new Set(ciclos.map((c) => c.ciclo_id))].map((id) => ({
    ciclo_id: id,
  }));

  // Regímenes del ciclo seleccionado
  const regimenes = ciclos
    .filter((c) => c.ciclo_id === Number(protocolForm.selectedCiclo))
    .map((c) => c.regimen);

  const classCols = withInputPeso
    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_1fr_1fr]'
    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_1fr]';

  return (
    <div className={`grid gap-4 ${classCols}`}>
      <div>
        <Label>Protocolo</Label>
        <Select onValueChange={onProtocoloChange}
          value={protocolForm.selectedProtocol || ''}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Seleccionar protocolo">
              {protocoloSeleccionado?.nombre || 'Seleccionar protocolo'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {protocolos.map((p) => (
                <SelectItem key={p.protocolo_id}
                  value={String(p.protocolo_id)}>
                  {p.nombre}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Ciclo</Label>
        <Select
          onValueChange={onCicloChange}
          disabled={!protocoloSeleccionado}
          value={protocolForm.selectedCiclo || ''}
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Seleccionar ciclo">
              {protocolForm.selectedCiclo
                ? `Ciclo ${protocolForm.selectedCiclo}`
                : 'Seleccionar ciclo'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {ciclosUnicos.map((c) => (
                <SelectItem key={c.ciclo_id}
                  value={String(c.ciclo_id)}>
                  Ciclo {c.ciclo_id}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Régimen</Label>
        <Select
          onValueChange={onRegimenChange}
          disabled={!protocolForm.selectedCiclo}
          value={protocolForm.selectedRegimen}
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Seleccionar régimen">
              {protocolForm.selectedRegimen !== undefined
                ? `Régimen ${protocolForm.selectedRegimen}`
                : 'Seleccionar régimen'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {regimenes.map((r) => (
                <SelectItem key={`${protocolForm.selectedCiclo}-${r}`}
                  value={String(r)}>
                  Régimen {r}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {withInputPeso && (
        <div>
          <Label>Peso (kg)</Label>
          <Input
            id="peso"
            value={form.peso}
            onChange={onPesoChange}
            placeholder="Ej: 70.5"
            className="mt-2"
          />
        </div>)}
    </div>
  );
}
