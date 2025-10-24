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
  ciclos,
  onProtocoloChange,
  onCicloChange,
  onPesoChange
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div>
        <Label htmlFor="protocolo">Protocolo</Label>
        <Select onValueChange={onProtocoloChange}>
          <SelectTrigger className="mt-2">
            <SelectValue>{form.protocolo || 'Seleccionar protocolo'}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {protocolos.map((p) => (
                <SelectItem key={p.protocolo_id}
                  value={String(p.protocolo_id)}>
                  {p.nombre || p.protocolo_id}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="ciclo">Ciclo</Label>
        <Select onValueChange={onCicloChange}>
          <SelectTrigger className="mt-2">
            <SelectValue>{form.ciclo || 'Seleccionar ciclo'}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {ciclos.map((c) => (
                <SelectItem key={c.ciclo_id}
                  value={String(c.ciclo_id)}>
                  {c.nombre || c.ciclo_id}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="peso">Peso (kg)</Label>
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
