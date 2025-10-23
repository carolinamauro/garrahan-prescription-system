'use client';

import { useState, useEffect } from 'react';
import { fetchProtocolos, fetchCiclos } from '../services/api';

export function useProtocolos() {
  const [protocolos, setProtocolos] = useState([]);
  const [ciclos, setCiclos] = useState([]);
  const [selectedProtocolo, setSelectedProtocolo] = useState('');

  useEffect(() => {
    fetchProtocolos()
      .then(setProtocolos)
      .catch(() => setProtocolos([]));
  }, []);

  useEffect(() => {
    if (!selectedProtocolo) {
      setCiclos([]);
      return;
    }

    fetchCiclos(selectedProtocolo)
      .then(setCiclos)
      .catch(() => setCiclos([]));
  }, [selectedProtocolo]);

  return {
    protocolos,
    ciclos,
    setSelectedProtocolo
  };
}
