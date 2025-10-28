'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export function DropdownCell({
  row,
  options = [],
  initialValue = '',
  onChange
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue);

  useEffect(() => {
    setSelectedValue(initialValue);
  }, [initialValue]);

  if (!options || options.length === 0) {
    return (
      <Button
        variant="outline"
        className="w-[200px] justify-between"
        disabled
      >
        Sin opciones disponibles
      </Button>
    );
  }

  const handleSelect = (option) => {
    const displayValue = option?.label || option;
    const value = option?.value || option;
    setSelectedValue(displayValue);
    setIsOpen(false);
    onChange?.(row.original.id, value);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] justify-between"
        >
          <span className="truncate">{selectedValue}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        className="w-[200px]" 
        align="start"
        side="bottom"
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={typeof option === 'object' ? 
              `${option.label}-${option.value?.presentacion_id || option.value}` : 
              option}
            onSelect={() => handleSelect(option)}
          >
            {option?.label || option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
