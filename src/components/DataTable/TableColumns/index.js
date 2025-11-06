import { DragHandle } from '../DragHandle';
import { TableCellViewer } from '../TableCellViewer';
import { SelectCell } from '@/components/DataTable/TableColumns/SelectColumn/SelectCell';
import { SelectHeader } from '@/components/DataTable/TableColumns/SelectColumn/SelectHeader';
import { IdCell } from '@/components/DataTable/TableColumns/IdColumn/IdCell';
import { StatusCell } from '@/components/DataTable/TableColumns/StatusColumn/StatusCell';
import { ActionCell } from '@/components/DataTable/TableColumns/ActionCell/ActionCell';
import { DataCell } from '@/components/DataTable/TableColumns/DataCell';
import { AgeCell } from '@/components/DataTable/TableColumns/AgeCell';
import { ProtocolCell } from '@/components/DataTable/TableColumns/ProtocolCell';
import { CalculateCell } from '@/components/DataTable/TableColumns/CalculateCell';
import { VerRecetaCell } from '@/components/DataTable/TableColumns/VerRecetaCell';
import {
  MedicationConcentrationCell
} from '@/components/DataTable/TableColumns/MedicationConcentrationCell';
import {
  MedicationPresentationCell
} from '@/components/DataTable/TableColumns/MedicationPresentationCell';

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
    accessorKey: 'DNI',
    header: 'DNI',
    cell: ({ row }) => { return <DataCell content={row.original.dni} />; },
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
    cell: ({ row }) => { return <DataCell content={row.original.diagnostico} />; },
  },
  {
    accessorKey: 'Fecha de solicitud de receta',
    header: 'Fecha de solicitud de receta',
    cell: ({ row }) => { return <DataCell content={row.original.fecha_solicitud_receta} />; },
  },
  {
    accessorKey: 'Ver receta',
    header: 'Ver receta',
    cell: ({ row }) => {
      return <VerRecetaCell
        recetaId={row.original.receta_id}
        type={row.original.tipo_receta}
      />;
    },
  },
];

export const getMedicationColumns = (
  handlePresentationChange,
  handleDelete,
  presentationsByDrug,
  handleConcentrationChange,
  selectedForms,
  availableConcentrations
) => [
  {
    accessorKey: 'nombre',
    header: 'Nombre genérico',
    cell: ({ row }) => <DataCell content={row.original.nombre} />,
  },
  {
    accessorKey: 'presentation',
    header: 'Presentación',
    cell: ({ row }) => (
      <MedicationPresentationCell
        row={row}
        handlePresentationChange={handlePresentationChange}
        presentationsByDrug={presentationsByDrug}
      />
    ),
  },
  {
    accessorKey: 'concentration',
    header: 'Cantidad × Concentración',
    cell: ({ row }) => (
      <MedicationConcentrationCell
        row={row}
        selectedForms={selectedForms}
        availableConcentrations={availableConcentrations}
        handleConcentrationChange={handleConcentrationChange}
      />
    ),
  },
  {
    accessorKey: 'needed_amount',
    header: 'Cantidad necesaria',
    cell: ({ row }) => <DataCell content={row.original.needed_amount || '-'} />,
  },
  {
    accessorKey: 'calculate',
    header: '',
    cell: ({ row }) => <CalculateCell row={row} />,
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionCell handleDelete={handleDelete(row.original.id)} />,
  },
];
