'use client';

import SearchInput from '@/components/SearchInput';

export default function SearchProtocol({
  options = [],
  searchValue,
  setSearchValue,
  placeholder = 'Buscar protocolo...',
  setShowProtocolInfo,
  setSaveBtnDisabled
}) {
  const handleSelect = (protocol) => {
    setSearchValue(protocol.nombre);
    setShowProtocolInfo(true);
    setSaveBtnDisabled(false);
  };

  return (
    <SearchInput
      placeholder={placeholder}
      options={options}
      value={searchValue}
      setValue={setSearchValue}
      onSelect={handleSelect}
      onChange={() => setSaveBtnDisabled(true)}
      getId={(protocol) => protocol.protocolo_id}
    />
  );
}
