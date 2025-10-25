'use client';

import { RadioSelector } from '@/components/RadioSelector';

export function ProtocolInfo({
  protocolo,
  selectedLine,
  setSelectedLine,
  selectedRegimen,
  setSelectedRegimen
}) {
  return (
    <div className="flex flex-col max-w-4xl">
      {protocolo && (
        <>
          <div className="mt-6">
            <h3 className="mb-3 text-lg font-semibold">Protocolo seleccionado</h3>
            <p className="text-sm text-foreground">{protocolo.nombre}</p>
          </div>

          <RadioSelector
            title="Etapas del protocolo / Línea"
            value={selectedLine}
            onChange={setSelectedLine}
            options={[
              { value: 1, label: 'Primera línea' },
              { value: 2, label: 'Segunda línea' },
            ]}
          />

          <RadioSelector
            title="Régimen"
            value={selectedRegimen}
            onChange={setSelectedRegimen}
            options={[
              { value: 1, label: 'Régimen 1' },
              { value: 2, label: 'Régimen 2' },
            ]}
          />

          <div className="mt-6">
            <h3 className="mb-4 text-lg font-semibold">Esquema de tratamiento</h3>
            <div className="overflow-auto rounded-lg border bg-white p-4">
              <img
                src="/protocolo.png"
                alt="Esquema de tratamiento PROTOCOLO GBTO OSTEOSSARCOMA 2006"
                className="w-full"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
