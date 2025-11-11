import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

export function RecetaButtons({ exportBtnDisabled, onPressExport }) {
  return (
    <div className="mt-6 flex items-center justify-end">
      <Button variant="default"
        disabled={exportBtnDisabled}
        size="lg"
        onClick={onPressExport}
      >
        <FileText className="mr-2 size-5" /> Exportar
      </Button>
    </div>
  );
}
