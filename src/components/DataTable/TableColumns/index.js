import { DragHandle } from '../DragHandle';
import { TableCellViewer } from '../TableCellViewer';
import { SelectCell } from '@/components/DataTable/TableColumns/SelectColumn/SelectCell';
import { SelectHeader } from '@/components/DataTable/TableColumns/SelectColumn/SelectHeader';
import { IdCell } from '@/components/DataTable/TableColumns/IdColumn/IdCell';
import { StatusCell } from '@/components/DataTable/TableColumns/StatusColumn/StatusCell';
import { ActionCell } from '@/components/DataTable/TableColumns/ActionCell/ActionCell';
import {DataCell} from '@/components/DataTable/TableColumns/DataCell';

// Definition of columns for @tanstack/react-table
export const getColumns = () => [
  {
    id: 'drag',
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: 'select',
    header: SelectHeader,
    cell: SelectCell,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'ID Paciente',
    header: 'ID Paciente',
    cell: ({row}) => { return <IdCell content={row.original.id} />; },
  },
  {
    accessorKey: 'Historia Clínica',
    header: 'Historia Clínica',
    cell: ({row}) => { return <IdCell content={row.original.historia_clinica} />; },
  },
  {
    accessorKey: 'Paciente',
    header: 'Paciente',
    cell: ({ row }) => { return <TableCellViewer item={row.original} />; },
  },
  {
    accessorKey: 'edad',
    header: 'Edad',
    cell: ({ row }) => {
      return <DataCell content={`${row.original.anios} años y ${row.original.dias} días`} />;
    },
  },
  {
    accessorKey: 'Diagnóstico',
    header: 'Diagnóstico',
    cell: ({ row }) => { return <DataCell content={row.original.protocolo.nombre} />; },
  },
  {
    accessorKey: 'estado',
    header: 'Estado',
    cell: StatusCell,
  },
  {
    id: 'actions',
    cell: ({ row }) => { return <ActionCell item={row.original} />; },
  },
];
