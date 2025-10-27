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
  initialValue,
  onChange
}) {
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
            key={option}
            onClick={() => {
              setCurrentValue(option);
              onChange(row.original.id, option);
            }}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
