'use client';

import SearchInput from '@/components/SearchInput';

export default function SearchProtocol({
  options = [],
  searchValue,
  setSearchValue,
  placeholder = 'Buscar protocolo...',
}) {
  const handleSelect = (protocol) => {
    setSearchValue(protocol.nombre);
  };

  return (
    <SearchInput
      placeholder={placeholder}
      options={options}
      value={searchValue}
      setValue={setSearchValue}
      onSelect={handleSelect}
      getId={(protocol) => protocol.protocolo_id}
    />
  );
}
