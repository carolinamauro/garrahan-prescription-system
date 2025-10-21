'use client';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import Link from 'next/link';

export function TableCellViewer({ item }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button variant="link"
          className="text-foreground w-fit px-0 text-left">
          <Link href={`/pacientes/${item.id}`}
            aria-label="Home">
            <span>{item.nombre}</span>
          </Link>
        </Button>
      </DrawerTrigger>
    </Drawer>
  );
}
