import { Button } from '@/components/ui/button';
import { FileText, MousePointerClick } from 'lucide-react';

export function ActionButtonsProtocol({ tieneProtocolo, tieneSupCorporal }) {
  return (
    <div className="mb-4 flex gap-2">
      <Button disabled={!tieneSupCorporal}>
        <MousePointerClick className="mr-2 h-4 w-4" />
                Seleccionar protocolo
      </Button>
      <Button variant="outline"
        disabled={!tieneProtocolo || !tieneSupCorporal}>
        <FileText className="mr-2 h-4 w-4" />
                Generar receta
      </Button>
    </div>
  );
}
