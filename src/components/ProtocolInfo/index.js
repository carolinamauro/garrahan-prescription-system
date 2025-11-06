'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export function ProtocolInfo({ protocolo, selectedRegimen, setSelectedRegimen }) {
  return (
    <div className="flex flex-col max-w-4xl">
      {protocolo && (
        <>
          <div>
            <h3 className="mb-3 text-lg font-semibold">Protocolo seleccionado</h3>
            <p className="text-sm text-foreground">{protocolo.nombre}</p>
          </div>

          <div className="mt-6">
            <Label>Régimen</Label>
            <Select
              value={String(selectedRegimen)}
              onValueChange={(value) => setSelectedRegimen(Number(value))}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Seleccionar régimen" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Array.from(
                    { length: (protocolo.cantidad_regimenes || 2) + 1 },
                    (_, i) => (
                      <SelectItem key={i} value={String(i)}>
                        Régimen {i}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
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
