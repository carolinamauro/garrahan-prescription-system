import { FileText } from 'lucide-react';
import { getRecipeUrl } from '@/services/recipe';
import { Button } from '@/components/ui/button';

export function VerRecetaCell({ recetaId, type }) {
  const onClick = (e) => {
    e.stopPropagation();
    const pdfUrl = getRecipeUrl(recetaId, type);
    window.open(pdfUrl, '_blank');
  };

  return (
    <Button
      onClick={onClick}
      variant="secundary"
      className="hover:bg-primary/10 hover:text-primary transition-colors"
    >
      <FileText className="h-4 w-4" />
    </Button>
  );
}
