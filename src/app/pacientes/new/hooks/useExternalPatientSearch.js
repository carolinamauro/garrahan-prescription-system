/* global alert */
'use client';

import { useState } from 'react';
import { searchExternalPatient } from '../services/api';

export function useExternalPatientSearch() {
  const [searchId, setSearchId] = useState('');
  const [externalData, setExternalData] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const handleSearch = async () => {
    setLoadingSearch(true);
    try {
      const data = await searchExternalPatient(searchId);
      setExternalData(data);
      return data;
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
