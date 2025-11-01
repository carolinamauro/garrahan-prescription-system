'use client';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle
} from '@/components/ui/empty';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function NotFoundPage() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background rounded-xl">
      <div className="px-4">
        <Empty>
          <EmptyHeader>
            <EmptyTitle>Paciente no encontrado</EmptyTitle>
            <EmptyDescription>
                              Por favor verifique el ID del paciente e intente nuevamente.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link href="/">
              <Button variant="outline"
                size="sm">Volver al inicio</Button>
            </Link>
          </EmptyContent>
        </Empty>
      </div>
    </div>
  );
}
