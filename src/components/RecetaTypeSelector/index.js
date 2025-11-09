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
        <ToggleGroupItem value="hospitalaria">Hospital</ToggleGroupItem>
        <ToggleGroupItem value="provincia">Provincia</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
