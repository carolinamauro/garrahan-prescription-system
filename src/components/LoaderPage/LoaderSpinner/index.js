import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Spinner } from '@/components/ui/spinner';

export function LoaderSpinner() {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>Cargando la página</EmptyTitle>
        <EmptyDescription>
                    Por favor espere mientras acomodamos todos los datos.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
