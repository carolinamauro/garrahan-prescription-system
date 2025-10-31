'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchInput from '@/components/SearchInput';

export default function SearchPatient({ options = [], placeholder = 'Buscar paciente...' }) {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleSelect = (patient) => {
    router.push(`/pacientes/${patient.paciente_id}`);
    setSearchValue('');
  };

  return (
    <SearchInput
      placeholder={placeholder}
      options={options}
      value={searchValue}
      setValue={setSearchValue}
      onSelect={handleSelect}
      getId={(patient) => patient.paciente_id}
      showedValue={(patient) => `${patient.nombre} ${patient.apellido}` }
    />
  );
}
