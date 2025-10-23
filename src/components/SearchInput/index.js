'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { mergeTwClassNames } from '@/lib/utils';

function filterPatientsByPrefix(options, query) {
    if (!query) return [];

    const lowerQuery = query.toLowerCase();

    return options.filter(option => {
        const words = option.nombre.split(' ');
        return words.some(word => word.toLowerCase().startsWith(lowerQuery));
    });
}


export default function SearchInput({
  placeholder = 'Buscar paciente...',
  options = [],
  className
}) {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const currSearchValue = e.target.value;
    setSearchValue(e.target.value)

    if (currSearchValue) {
      const filtered = filterPatientsByPrefix(options, currSearchValue);
      setFilteredOptions(filtered);
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  };

  const handleSelect = (option) => {
    setSearchValue(option.nombre);
    setShowOptions(false);
    router.push(`/pacientes/${option.id}`);
    setSearchValue('');
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleChange}
          onFocus={() => searchValue && setShowOptions(true)}
          onBlur={() => setTimeout(() => setShowOptions(false), 100)}
          className={mergeTwClassNames('pr-9', className)}
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2
        text-muted-foreground h-4 w-4 pointer-events-none" />
      </div>

      {showOptions && filteredOptions.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full rounded-md
        border border-border bg-background shadow-md">
          {filteredOptions.map((option) => (
            <li
              key={option.id}
              className="cursor-pointer px-3 py-2 text-sm
              hover:bg-accent hover:text-accent-foreground"
              onMouseDown={() => handleSelect(option)}
            >
              {option.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
