import { Badge } from "@/components/ui/badge";
import { IconCircleCheckFilled, IconLoader } from "@tabler/icons-react";

export const StatusCell = ({ row }) => (
    <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.status === "Done" ? (
            <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        ) : (
            <IconLoader />
        )}
        {row.original.status}
    </Badge>
)