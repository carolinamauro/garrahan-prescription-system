import {DropdownCell} from '@/components/DataTable/TableColumns/DropdownCell';

export function MedicationPresentationCell({
  row,
  handlePresentationChange,
  presentationsByDrug
}) {
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
}
