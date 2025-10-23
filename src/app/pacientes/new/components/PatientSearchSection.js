'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function PatientSearchSection({
  searchId,
  setSearchId,
  loadingSearch,
  onSearch
}) {
  return (
    <div className="grid md:grid-cols-[1fr_auto] gap-4 items-end">
      <div>
        <Label htmlFor="searchId">Buscar por id_hospitalario</Label>
        <Input
          id="searchId"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Ej: 12345"
          className="mt-2"
        />
      </div>
      <div>
        <Button
          onClick={onSearch}
          size="lg"
          disabled={loadingSearch}
        >
          {loadingSearch ? 'Buscando...' : 'Buscar'}
        </Button>
      </div>
    </div>
  );
}
