import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export function RecetaTypeSelector({ value, onChange }) {
  return (
    <div>
      <Label>Tipo de receta</Label>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(v) => onChange(v || 'hospitalaria')}
        className="mt-2"
      >
        <div className="flex">
          <ToggleGroupItem value="hospitalaria">
          Banco Nacional de Drogas Oncologicas/ Otros
          </ToggleGroupItem>
        </div>
        <div className="flex">
          <ToggleGroupItem value="provincia">Banco de Drogas PBA (IPC)</ToggleGroupItem>
        </div>
      </ToggleGroup>
    </div>
  );
}
