'use client';

import { RadioSelector } from '@/components/RadioSelector';

export function ProtocolInfo({ protocolo, selectedRegimen, setSelectedRegimen }) {
  return (
    <div className="flex flex-col max-w-4xl">
      {protocolo && (
        <>
          <div>
            <h3 className="mb-3 text-lg font-semibold">Protocolo seleccionado</h3>
            <p className="text-sm text-foreground">{protocolo.nombre}</p>
          </div>

          <RadioSelector
            title="Régimen"
            value={selectedRegimen}
            onChange={setSelectedRegimen}
            options={
              Array.from(
                { length: protocolo.cantidad_regimenes || 0 },
                (_, i) => ({ value: i, label: `Régimen ${i}` })
              )
            }
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
