'use client';

import { Button } from '@/components/ui/button';

export function CalculateCell({ row }) {
  return (
    <Button
      onClick={() => row.original.onCalculate?.(row.original)}
      disabled={!row.original.concentrationData || !row.original.administracion_id}
      variant="secondary"
      size="sm"
    >
      Calcular
    </Button>
  );
}