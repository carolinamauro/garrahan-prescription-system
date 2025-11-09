/* eslint-disable max-len */
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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { mergeTwClassNames } from '@/lib/utils';
import { ESTADOS_PROTOCOLO } from '@/lib/constants';

export function ProtocolSection({
  form,
  protocolos,
  onProtocoloChange,
  onChange,
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
    <div className="flex gap-5 flex-wrap">
      <div className='flex-1'>
        <Label>Protocolo</Label>
        <Select onValueChange={onProtocoloChange}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Seleccionar protocolo"
              value={protocoloSeleccionado?.nombre}/>
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

      <div className='flex-1'>
        <Label>Ciclo</Label>
        <Select
          onValueChange={(value) => onChange('ciclo', value)}
          disabled={!protocoloSeleccionado}
          value={form.ciclo}
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder='Seleccionar ciclo' />
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

      <div className='flex-1'>
        <Label>Régimen</Label>
        <Select
          onValueChange={(value) => onChange('regimen', value)}
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

      <div className='flex-1'>
        <Label>Fecha de inicio</Label>
        <DatePicker
          maxDate={new Date()}
          className={mergeTwClassNames(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            'mt-2'
          )}
          selected={form.fecha_inicio}
          placeholderText='Seleccionar fecha'
          onChange={(date) => onChange('fecha_inicio', date)}
          dateFormat={'dd/MM/yyyy'}
        />
      </div>

      <div className='flex-1'>
        <Label>Estado del protocolo</Label>
        <Select onValueChange={(value) => onChange('estado', value)}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Seleccionar estado"
              value={form.estado}/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {ESTADOS_PROTOCOLO.map((p) => (
                <SelectItem key={p.value}
                  value={String(p.label)}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className='flex-1 min-w-[100px]'>
        <Label>Peso (kg)</Label>
        <Input
          id="peso"
          value={form.peso}
          onChange={({ target }) => onChange('peso', target.value)}
          placeholder="Ej: 70.5"
          className="mt-2"
        />
      </div>
    </div>
  );
}
