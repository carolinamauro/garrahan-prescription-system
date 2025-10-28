import { DragHandle } from '../DragHandle';
import { TableCellViewer } from '../TableCellViewer';
import { SelectCell } from '@/components/DataTable/TableColumns/SelectColumn/SelectCell';
import { SelectHeader } from '@/components/DataTable/TableColumns/SelectColumn/SelectHeader';
import { IdCell } from '@/components/DataTable/TableColumns/IdColumn/IdCell';
import { StatusCell } from '@/components/DataTable/TableColumns/StatusColumn/StatusCell';
import { ActionCell } from '@/components/DataTable/TableColumns/ActionCell/ActionCell';
import { DataCell } from '@/components/DataTable/TableColumns/DataCell';
import { FileText } from 'lucide-react';
import { DropdownCell } from '@/components/DataTable/TableColumns/DropdownCell';
import { AgeCell } from '@/components/DataTable/TableColumns/AgeCell';
import { ProtocolCell } from '@/components/DataTable/TableColumns/ProtocolCell';

// Definition of columns for @tanstack/react-table
export const getPatientColumns = (handleEdit) => [
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
    cell: ({ row }) => { return <IdCell content={row.original.paciente_id} />; },
  },
  {
    accessorKey: 'Historia Clínica',
    header: 'Historia Clínica',
    cell: ({ row }) => { return <IdCell content={row.original.id_hospitalario} />; },
  },
  {
    accessorKey: 'Paciente',
    header: 'Paciente',
    cell: ({ row }) => { return <TableCellViewer item={row.original} />; },
  },
  {
    accessorKey: 'edad',
    header: 'Edad',
    cell: ({ row }) => { return <AgeCell anios={row.original.anios}
      dias={row.original.dias} />; },
  },
  {
    accessorKey: 'Diagnóstico',
    header: 'Diagnóstico',
    cell: ({ row }) => {
      return <ProtocolCell activeProtocol={row.original.protocolo} />;
    },
  },
  {
    accessorKey: 'estado',
    header: 'Estado',
    cell: ({ row }) => {
      return <StatusCell activeProtocol={row.original.protocolo} />;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => { return <ActionCell handleEdit={handleEdit(row.original.id)} />; },
  },
];

export const getProtocolColumns = () => [
  {
    accessorKey: 'Ciclos solicitados',
    header: 'Ciclos solicitados',
    cell: ({ row }) => { return <DataCell content={row.original.ciclos_solicitados} />; },
    size: '200px'
  },
  {
    accessorKey: 'Protocolo',
    header: 'Protocolo',
    cell: ({ row }) => { return <DataCell content={row.original.protocolo} />; },
  },
  {
    accessorKey: 'Fecha de inicio del tratamiento',
    header: 'Fecha de inicio del tratamiento',
    cell: ({ row }) => { return <DataCell content={row.original.fecha_inicio_tratamiento} />; },
  },
  {
    accessorKey: 'Fecha de solicitud de receta',
    header: 'Fecha de solicitud de receta',
    cell: ({ row }) => { return <DataCell content={row.original.fecha_solicitud_receta} />; },
  },
  {
    accessorKey: 'Cantidad de ciclos solicitados',
    header: 'Cantidad de ciclos solicitados',
    cell: ({ row }) => { return <DataCell content={row.original.cantidad_ciclos_solicitados} />; },
  },
  {
    accessorKey: 'Ver receta',
    header: 'Ver receta',
    cell: () => { return <FileText className="mr-2 h-4 w-4" />; },
  },
];

export const getMedicationColumns = (
  handlePresentationChange,
  handleDelete,
  handleConcentrationChange
) => [
  {
    accessorKey: 'Nombre genérico',
    header: 'Nombre genérico',
    cell: ({ row }) => ( <DataCell content={row.original.genericName} /> ),
  },
  {
    accessorKey: 'Cantidad necesaria',
    header: 'Cantidad necesaria',
    cell: ({ row }) => ( <DataCell content={row.original.requiredAmount} /> ),
  },
  {
    accessorKey: 'presentation',
    header: 'Presentación',
    cell: ({ row }) => (
      <DropdownCell
        row={row}
        options={row.original.presentations}
        onChange={handlePresentationChange}
        initialValue={row.original.presentation || 'Elegir presentación'}
      />
    ),
  },
  {
    accessorKey: 'concentration',
    header: 'Cantidad × Concentración',
    cell: ({ row }) => (
      <DropdownCell
        row={row}
        options={row.original.concentrations}
        onChange={handleConcentrationChange}
        initialValue={row.original.concentration}
      />
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => ( <ActionCell handleDelete={handleDelete(row.original.id)} /> ),
  },
];
