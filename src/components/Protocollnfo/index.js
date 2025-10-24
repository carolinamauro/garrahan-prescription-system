'use client';

import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export function ProtocolInfo({ protocolo }) {
  const [selectedLine, setSelectedLine] = useState('primera');
  const [selectedRegimen, setSelectedRegimen] = useState('primer');

  return (
    <div className="flex flex-col max-w-4xl">
      {protocolo && (
        <>
          <div className="mt-6">
            <h3 className="mb-3 text-lg font-semibold">Protocolo seleccionado</h3>
            <p className="text-sm text-foreground">{protocolo}</p>
          </div>

          <div className="mt-6">
            <h3 className="mb-4 text-lg font-semibold">Etapas del protocolo / Línea</h3>
            <RadioGroup value={selectedLine}
              onValueChange={setSelectedLine}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="primera"
                  id="primera" />
                <Label htmlFor="primera"
                  className="cursor-pointer font-normal">
                                            Primera línea
                </Label>

                <RadioGroupItem value="segunda"
                  id="segunda" />
                <Label htmlFor="segunda"
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
                <RadioGroupItem value="primer"
                  id="primer" />
                <Label htmlFor="primer"
                  className="cursor-pointer font-normal">
                            Régimen 1
                </Label>

                <RadioGroupItem value="segundo"
                  id="segundo" />
                <Label htmlFor="segundo"
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
