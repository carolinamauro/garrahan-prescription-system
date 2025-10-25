'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

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

          <div className="mt-6">
            <h3 className="mb-4 text-lg font-semibold">Etapas del protocolo / Línea</h3>
            <RadioGroup value={selectedLine}
              onValueChange={setSelectedLine}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={1}
                  id="linea-1" />
                <Label htmlFor="linea-1"
                  className="cursor-pointer font-normal">
                    Primera línea
                </Label>

                <RadioGroupItem value={2}
                  id="linea-2" />
                <Label htmlFor="linea-2"
                  className="cursor-pointer font-normal">
                    Segunda línea
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="mt-6">
            <h3 className="mb-4 text-lg font-semibold">Régimen</h3>
            <RadioGroup value={selectedRegimen}
              onValueChange={setSelectedRegimen}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={1}
                  id="regimen-1" />
                <Label htmlFor="regimen-1"
                  className="cursor-pointer font-normal">
                    Régimen 1
                </Label>

                <RadioGroupItem value={2}
                  id="regimen-2" />
                <Label htmlFor="regimen-2"
                  className="cursor-pointer font-normal">
                    Régimen 2
                </Label>
              </div>
            </RadioGroup>
          </div>

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
