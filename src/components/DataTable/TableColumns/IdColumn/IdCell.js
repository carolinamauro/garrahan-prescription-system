import { Badge } from '@/components/ui/badge';

export const IdCell = ({ content }) => (
  <div className="w-32">
    <Badge variant="outline"
      className="text-muted-foreground px-1.5">
      {content}
    </Badge>
  </div>
);
