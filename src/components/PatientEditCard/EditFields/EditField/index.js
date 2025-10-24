import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function EditField({
  id,
  label,
  placeholder,
  savedLabel,
  savedValue,
  hasInput,
  form,
  handleChange
}) {
  return (
    <div key={id}
      className="space-y-4">
      <div>
        <Label htmlFor={id}
          className="text-base font-medium">
          {label}
        </Label>
        {hasInput ? (
          <Input id={id}
            placeholder={placeholder}
            value={form}
            onChange={handleChange}
            className="mt-2" />
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">{placeholder}</p>
        )}
      </div>

      {savedLabel && (
        <div>
          <p className="text-sm font-medium text-muted-foreground">{savedLabel}</p>
          <p className="mt-1 text-sm">{savedValue}</p>
        </div>
      )}
    </div>
  );
}
