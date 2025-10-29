'use client';

import SearchInput from '@/components/SearchInput';
import { useState } from 'react';

function filterFn(protocols, query) {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();

  return protocols.filter(option => {
    const words = option.normalized.split(' ');
    return words.some(word => word.toLowerCase().startsWith(lowerQuery)) ||
                    option.normalized.toLowerCase().startsWith(lowerQuery);
  }
  );
}

export default function SearchProtocol({
  options = [],
  setSelectedValue,
  placeholder = 'Buscar protocolo...',
  setShowProtocolInfo,
  setSaveBtnDisabled
}) {
  const [searchValue, setSearchValue] = useState('');

  const handleSelect = (protocol) => {
    setSelectedValue(protocol);
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
      filterFn={filterFn}
      getId={(protocol) => protocol.protocolo_id}
      showedValue={(protocol) => protocol.nombre }
    />
  );
}
