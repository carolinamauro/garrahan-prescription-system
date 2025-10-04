import { Badge } from "@/components/ui/badge"

export const IdCell = ({ row }) => (
    <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
            {row.original.id}
        </Badge>
    </div>
)