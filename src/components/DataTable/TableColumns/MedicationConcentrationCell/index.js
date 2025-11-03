import { DropdownCell } from '@/components/DataTable/TableColumns/DropdownCell';
import { DataCell } from '@/components/DataTable/TableColumns/DataCell';

export function MedicationConcentrationCell({
  row,
  selectedForms,
  availableConcentrations,
  handleConcentrationChange
}) {
  const selectedForm = selectedForms[row.original.id];
  if (!selectedForm) return <DropdownCell
    initialValue={'Elegir concentración'}
    options={['Elegir concentración']}
    disabled={true}
  />;

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
}
