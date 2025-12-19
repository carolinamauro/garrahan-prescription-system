/* global alert */
'use client';

import { useState } from 'react';
import { searchExternalPatient } from '@/services/pacientes';

export function useExternalPatientSearch() {
  const [searchId, setSearchId] = useState('');
  const [externalData, setExternalData] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const formatExternalId = (searchId) => {
    const number = Number(searchId);
    return `H${number.toString().padStart(3, '0')}`;
  };

  const handleSearch = async () => {
    setLoadingSearch(true);
    try {
      const data = await searchExternalPatient(formatExternalId(searchId));
      const dataWithId = { ...(data || {}), id_hospitalario: formatExternalId(searchId) };
      setExternalData(dataWithId);
      return dataWithId;
    } catch {
      setExternalData(null);
      alert('No se encontraron datos externos para ese id');
      return null;
    } finally {
      setLoadingSearch(false);
    }
  };

  return {
    searchId,
    setSearchId,
    externalData,
    loadingSearch,
    handleSearch
  };
}
