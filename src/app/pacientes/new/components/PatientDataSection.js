'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function PatientDataSection({ form, onChange }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <Label htmlFor="nombre">Nombre</Label>
        <Input
          id="nombre"
          value={form.nombre}
          onChange={onChange}
          className="mt-2"
        />
      </div>
      <div>
        <Label htmlFor="apellido">Apellido</Label>
        <Input
          id="apellido"
          value={form.apellido}
          onChange={onChange}
          className="mt-2"
        />
      </div>
      <div>
        <Label htmlFor="id_hospitalario">ID Hospitalario</Label>
        <Input
          id="id_hospitalario"
          value={form.id_hospitalario}
          onChange={onChange}
          className="mt-2"
        />
      </div>
      <div>
        <Label htmlFor="fecha_nacimiento">Fecha de nacimiento</Label>
        <Input
          id="fecha_nacimiento"
          value={form.fecha_nacimiento}
          onChange={onChange}
          className="mt-2"
        />
      </div>
    </div>
  );
}
