import { Badge } from '@/components/ui/badge';
import { IconCircleCheckFilled, IconLoader, IconDots } from '@tabler/icons-react';

export const StatusCell = ({ row }) => (
  <Badge variant="outline"
    className="text-muted-foreground px-1.5">
    {row.original.status === 'Finalizado' ? (
      <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
    ) : row.original.status === 'En espera' ? (
      <IconDots className="text-yellow-500 dark:text-yellow-400" />
    ) : (
      <IconLoader className="text-muted-foreground" />
    )}
    {row.original.status}
  </Badge>
);
