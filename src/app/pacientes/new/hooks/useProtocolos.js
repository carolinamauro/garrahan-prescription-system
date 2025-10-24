'use client';
import { useState, useEffect } from 'react';
import { fetchProtocolos, fetchCiclos } from '../services/api';

export function useProtocolos() {
  const [protocolos, setProtocolos] = useState([]);
  const [ciclos, setCiclos] = useState([]);
  const [selectedProtocolo, setSelectedProtocolo] = useState('');
  const [selectedCiclo, setSelectedCiclo] = useState('');
  const [selectedRegimen, setSelectedRegimen] = useState('');

  useEffect(() => {
    fetchProtocolos()
      .then(setProtocolos)
      .catch(() => setProtocolos([]));
  }, []);

  useEffect(() => {
    if (!selectedProtocolo) {
      setCiclos([]);
      setSelectedCiclo('');
      setSelectedRegimen('');
      return;
    }

    fetchCiclos(selectedProtocolo)
      .then((c) => {
        setCiclos(c);
        setSelectedCiclo('');
        setSelectedRegimen('');
      })
      .catch(() => {
        setCiclos([]);
        setSelectedCiclo('');
        setSelectedRegimen('');
      });
  }, [selectedProtocolo]);

  return {
    protocolos,
    ciclos,
    selectedProtocolo,
    selectedCiclo,
    selectedRegimen,
    setSelectedProtocolo,
    setSelectedCiclo,
    setSelectedRegimen
  };
}
