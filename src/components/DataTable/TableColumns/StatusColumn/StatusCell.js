import { Badge } from '@/components/ui/badge';
import { IconCircleCheckFilled, IconLoader } from '@tabler/icons-react';

export const StatusCell = ({ activeProtocol }) => {
  const isActive = activeProtocol !== null;

  return (
    <Badge variant="outline"
      className="text-muted-foreground px-1.5 flex items-center gap-1">
      {isActive ? (
        <>
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                    Activo
        </>
      ) : (
        <>
          <IconLoader className="text-muted-foreground" />
                    Inactivo
        </>
      )}
    </Badge>
  );
};
