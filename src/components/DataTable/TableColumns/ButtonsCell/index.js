import { Button } from '@/components/ui/button';
import { IconTrash, IconPencil } from '@tabler/icons-react';

export function ButtonsCell({ item, handleDelete }) {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        size="sm"
        className="text-red-600 hover:text-red-700"
        onClick={() => handleDelete(item.id)}
      >
        <IconTrash className="size-4 mr-1" /> Eliminar
      </Button>
      <Button
        variant="ghost"
        size="sm"
      >
        <IconPencil className="size-4 mr-1" /> Editar
      </Button>
    </div>
  );
}
