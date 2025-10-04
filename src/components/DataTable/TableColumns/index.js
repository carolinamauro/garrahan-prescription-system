import { DragHandle } from "../DragHandle"
import { TableCellViewer } from "../TableCellViewer"
import { SelectCell } from "@/components/DataTable/TableColumns/SelectColumn/SelectCell";
import { SelectHeader } from "@/components/DataTable/TableColumns/SelectColumn/SelectHeader";
import { IdCell } from "@/components/DataTable/TableColumns/IdColumn/IdCell";
import { StatusCell } from "@/components/DataTable/TableColumns/StatusColumn/StatusCell";
import { ActionCell } from "@/components/DataTable/TableColumns/ActionCell/ActionCell";

// Definition of columns for @tanstack/react-table
export const getColumns = () => [
    {
        id: "drag",
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
    },
    {
        id: "select",
        header: SelectHeader,
        cell: SelectCell,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "ID Paciente",
        cell: IdCell,
    },
    {
        accessorKey: "header",
        header: "Paciente",
        cell: ({ row }) => { return <TableCellViewer item={row.original} /> },
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: StatusCell,
    },
    {
        id: "actions",
        cell: ActionCell,
    },
]