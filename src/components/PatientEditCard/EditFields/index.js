import { EditField } from '@/components/PatientEditCard/EditFields/EditField';
import { calculateBodySurface } from '@/lib/utils';

export function EditFields({form, setForm, patient}) {
  const defaultValue = 'No informa';

  const currentBodySurface = calculateBodySurface(form.peso || patient.peso);

  const fields = [
    {
      id: 'peso',
      label: 'Peso (en kg)',
      placeholder: 'Ingresa el peso del paciente (en kg)',
      savedLabel: 'Peso guardado (en kg)',
      savedValue: patient.peso || defaultValue,
      hasInput: true,
      form: form.peso
    },
    {
      id: 'altura',
      label: 'Altura (en cm)',
      placeholder: 'Ingresa la altura del paciente (en cm)',
      savedLabel: 'Altura guardada (en cm)',
      savedValue: patient.altura || defaultValue,
      hasInput: true,
      form: form.altura
    },
    {
      id: 'obra_social',
      label: 'Obra social',
      placeholder: 'Ingresa obra social del paciente',
      savedLabel: 'Obra social guardada',
      savedValue: patient.obra_social || defaultValue,
      hasInput: true,
      form: form.obra_social
    },
    {
      id: 'sup_corporal',
      label: 'Superficie corporal',
      placeholder: '-',
      savedLabel: 'Valor calculado',
      savedValue: currentBodySurface ? `${currentBodySurface} m²` : 'No disponible',
      hasInput: false,
      form: null
    },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="grid gap-8 md:grid-cols-[0.7fr_0.7fr_0.7fr_0.5fr]">
      {fields.map(({ id, label, placeholder, savedLabel, savedValue, hasInput, form }) => (
        <EditField
          id={id}
          key={id}
          label={label}
          placeholder={placeholder}
          savedLabel={savedLabel}
          savedValue={savedValue}
          hasInput={hasInput}
          form={form}
          handleChange={handleChange}
        />
      ))}
    </div>
  );
}
