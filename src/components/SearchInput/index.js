'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { mergeTwClassNames } from '@/lib/utils';

function defaultFilter(options, query) {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();

  return options.filter(option => {
    const words = option.normalized.split(' ');
    return words.some(word => word.toLowerCase().startsWith(lowerQuery));
  });
}

function normalizeText(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export default function SearchInput({
  placeholder = 'Buscar...',
  options = [],
  value,
  setValue,
  onSelect,
  onChange,
  filterFn = defaultFilter,
  getId,
  className
}) {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const normalizedOptions = useMemo(() => {
    return options.map(option => ({
      ...option,
      normalized: normalizeText(option.nombre),
    }));
  }, [options]);

  const handleChange = (e) => {
    const currValue = e.target.value;
    setValue(currValue);

    if (currValue) {
      const filtered = filterFn(normalizedOptions, normalizeText(currValue));
      setFilteredOptions(filtered);
      setShowOptions(true);
      setActiveIndex(-1);
      onChange?.();
    } else {
      setShowOptions(false);
    }
  };

  const handleSelect = (option) => {
    setValue(option.nombre);
    setShowOptions(false);
    setActiveIndex(-1);
    onSelect?.(option);
  };

  const handleKeyDown = (e) => {
    if (!showOptions || filteredOptions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % filteredOptions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + filteredOptions.length) % filteredOptions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0) handleSelect(filteredOptions[activeIndex]);
    } else if (e.key === 'Escape') {
      setShowOptions(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="relative w-full max-w-sm">
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => value && setShowOptions(true)}
          onBlur={() => window.setTimeout(() => setShowOptions(false), 100)}
          onKeyDown={handleKeyDown}
          className={mergeTwClassNames('pr-9', className)}
        />
        <Search
          className="absolute right-3 top-1/2 -translate-y-1/2
          text-muted-foreground h-4 w-4 pointer-events-none"
        />
      </div>

      {showOptions && filteredOptions.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full rounded-md
        border border-border bg-background shadow-md">
          {filteredOptions.map((option, index) => (
            <li
              key={getId(option)}
              className={mergeTwClassNames(
                'cursor-pointer px-3 py-2 text-sm',
                index === activeIndex
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              )}
              onMouseDown={() => handleSelect(option)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {option.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
