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

export default function ProtocolSection({
  form,
  protocolos,
  onProtocoloChange,
  onCicloChange,
  onRegimenChange,
  onPesoChange,
}) {
  const protocoloSeleccionado = protocolos.find(
    (p) => p.protocolo_id === Number(form.protocolo)
  );
  const ciclos = protocoloSeleccionado?.ciclos || [];

  // Ciclos únicos
  const ciclosUnicos = [...new Set(ciclos.map((c) => c.ciclo_id))].map((id) => ({
    ciclo_id: id,
  }));

  // Regímenes del ciclo seleccionado
  const regimenes = ciclos
    .filter((c) => c.ciclo_id === Number(form.ciclo))
    .map((c) => c.regimen);

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div>
        <Label>Protocolo</Label>
        <Select onValueChange={onProtocoloChange}>
          <SelectTrigger className="mt-2">
            {/* Este ya estaba bien */}
            <SelectValue>{protocoloSeleccionado?.nombre || 'Seleccionar protocolo'}</SelectValue>
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
          // Añadimos 'value' para que el Select sepa qué mostrar
          value={form.ciclo}
        >
          <SelectTrigger className="mt-2">
            {/* --- CAMBIO AQUÍ --- */}
            <SelectValue>
              {form.ciclo ? `Ciclo ${form.ciclo}` : 'Seleccionar ciclo'}
            </SelectValue>
            {/* --- FIN CAMBIO --- */}
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
          disabled={!form.ciclo}
          value={form.regimen}
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Seleccionar régimen" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {regimenes.map((r) => (
                <SelectItem key={`${form.ciclo}-${r}`}
                  value={String(r)}>
                  Régimen {r}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Peso (kg)</Label>
        <Input
          id="peso"
          value={form.peso}
          onChange={onPesoChange}
          placeholder="Ej: 70.5"
          className="mt-2"
        />
      </div>
    </div>
  );
}
