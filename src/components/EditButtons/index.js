import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function EditButtons({ handleSave, href }) {
  return (
    <div className="fixed bottom-8 right-6 flex gap-3 px-4 lg:px-4">
      <Button size="lg"
        onClick={handleSave}>
                Guardar
      </Button>
      <Link href={href}>
        <Button size="lg"
          variant="outline">
                    Salir
        </Button>
      </Link>
    </div>
  );
}
