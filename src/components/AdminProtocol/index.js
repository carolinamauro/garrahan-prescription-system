'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function AdminProtocol() {
  const [view, setView] = useState('');

  const handleSearchProtocols = () => {
    setView('buscar-protocolos');
  };

  const handleLoadProtocol = () => {
    setView('cargar-protocolo');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Protocolos</h1>
      <div className='mt-6'>
        <Button size="sm"
          className="mr-2"
          onClick={handleSearchProtocols}>
          <span className="hidden lg:inline p-4">Buscar Protocolos</span>
        </Button>
        <Button size="sm"
          onClick={handleLoadProtocol}>
          <span className="hidden lg:inline p-4">Cargar Protocolo</span>
        </Button>
      </div>
      {view === 'cargar-protocolo' && (
        <div className='mt-6'>
          <h2 className="text-xl font-semibold">Carga de Protocolos</h2>
          <p>Aquí vas a poder cargar los protocolos.</p>
        </div>
      )}
      {view === 'buscar-protocolos' && (
        <div className='mt-6'>
          <h2 className="text-xl font-semibold">Buscar Protocolos</h2>
          <input
            type="text"
            placeholder="Buscar por nombre o ID"
            className="border rounded px-3 py-2 w-full"
          />
        </div>
      )}
    </div>
  );
}
