'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export function RadioSelector({ title, value, onChange, options }) {
  return (
    <div className="mt-6">
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      <RadioGroup value={value}
        onValueChange={onChange}>
        <div className="flex items-center space-x-4">
          {options.map((opt) => (
            <div key={opt.value}
              className="flex items-center space-x-2">
              <RadioGroupItem value={opt.value}
                id={`${title}-${opt.value}`} />
              <Label
                htmlFor={`${title}-${opt.value}`}
                className="cursor-pointer font-normal"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
