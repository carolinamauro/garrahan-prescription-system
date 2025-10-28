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

const MedicationPresentationCell = ({ 
  row, 
  handlePresentationChange, 
  presentationsByDrug 
}) => {
  const presentations = presentationsByDrug[row.original.droga_id] || [];
  // Usamos un Map para mantener un único valor por forma farmacéutica
  const formsMap = new Map();
  presentations.forEach(p => {
    if (!formsMap.has(p.forma_farmaceutica_nombre)) {
      formsMap.set(p.forma_farmaceutica_nombre, p.forma_farmaceutica_id);
    }
  });
  
  const options = Array.from(formsMap).map(([form, id]) => ({
    label: form,
    value: form,
    uniqueId: `${id}-${form}`
  }));

  const initialValue = row.original.presentation || 'Elegir presentación';

  const handleChange = (id, selectedValue) => {
    handlePresentationChange(id, selectedValue);
  };

  return (
    <DropdownCell
      key={`presentation-${row.original.id}`}
      row={row}
      options={options}
      onChange={handleChange}
      initialValue={initialValue}
    />
  );
};

const MedicationConcentrationCell = ({
  row,
  selectedForms,
  availableConcentrations,
  handleConcentrationChange
}) => {
  const selectedForm = selectedForms[row.original.id];
  if (!selectedForm) return <DataCell content="" />;

  const presentations = availableConcentrations[row.original.id] || [];
  
  if (presentations.length === 1) {
    const presentation = presentations[0];
    return (
      <DataCell 
        content={`${presentation.fuerza_valor} ${presentation.fuerza_unidad}`} 
      />
    );
  }
  
  if (presentations.length > 1) {
    const options = presentations.map(p => ({
      label: `${p.fuerza_valor} ${p.fuerza_unidad}`,
      value: p,
      // Añadimos un ID único compuesto
      uniqueId: `${p.presentacion_id}-${p.fuerza_valor}-${p.fuerza_unidad}`
    }));

    const initialValue = row.original.concentration || 'Elegir concentración';

    const handleChange = (id, selectedPresentation) => {
      handleConcentrationChange(id, selectedPresentation);
    };

    return (
      <DropdownCell
        key={`concentration-${row.original.id}`}
        row={row}
        options={options}
        onChange={handleChange}
        initialValue={initialValue}
      />
    );
  }
  
  return <DataCell content="" />;
};

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
    id: 'actions',
    cell: ({ row }) => <ActionCell handleDelete={handleDelete(row.original.id)} />,
  },
];
