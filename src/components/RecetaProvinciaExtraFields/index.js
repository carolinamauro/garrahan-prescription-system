import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function RecetaProvinciaExtraFields({ values, onChange }) {
  const handleChange = (e) => onChange({ ...values, [e.target.name]: e.target.value });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label>Estadio</Label>
        <Input
          className="mt-2"
          name="estadio"
          value={values.estadio}
          onChange={handleChange}
          placeholder="Ingresar estadio"
        />
      </div>

      <div>
        <Label>Intervalo</Label>
        <Input
          className="mt-2"
          name="intervalo"
          value={values.intervalo}
          onChange={handleChange}
          placeholder="Ingresar intervalo"
        />
      </div>

      <div>
        <Label>T/N/M</Label>
        <Input
          className="mt-2"
          name="tnm"
          value={values.tnm}
          onChange={handleChange}
          placeholder="Ej: 0/1/0"
        />
      </div>

      <div>
        <Label>PS (0-4)</Label>
        <Input
          className="mt-2"
          name="ps"
          value={values.ps}
          onChange={handleChange}
          placeholder="Ingresar valor"
        />
      </div>
    </div>
  );
}
