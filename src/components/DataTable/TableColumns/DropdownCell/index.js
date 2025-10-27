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

export function DropdownCell({ row, options = [], onChange }) {
  const initialValue = row.original.presentation || 'Elegir presentación';
  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    setCurrentValue(initialValue);
  }, [currentValue]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] justify-between"
        >
          {currentValue}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[200px]">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => {
              setCurrentValue(option.value);
              onChange(row.original.id, option.value);
            }}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
