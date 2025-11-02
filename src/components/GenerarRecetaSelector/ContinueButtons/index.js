import {Button} from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function ContinueButtons({ handleContinue }) {
  const router = useRouter();

  return (
    <div className="mt-6 flex justify-end gap-3">
      <Button
        variant="default"
        size="lg"
        onClick={handleContinue}>
                Continuar
      </Button>
      <Button
        variant="outline"
        size="lg"
        onClick={() => router.back()}>
                Salir
      </Button>
    </div>
  );
}
