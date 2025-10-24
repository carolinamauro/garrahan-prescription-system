'use client';

import SearchInput from '@/components/SearchInput';

export default function SearchProtocol({
  options = [],
  searchValue,
  setSearchValue,
  placeholder = 'Buscar protocolo...',
  setShowProtocolInfo
}) {
  const handleSelect = (protocol) => {
    setSearchValue(protocol.nombre);
    setShowProtocolInfo(true);
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
