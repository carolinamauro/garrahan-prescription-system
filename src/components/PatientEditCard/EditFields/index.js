import { EditField } from '@/components/PatientEditCard/EditFields/EditField';

const calculateBodySurface = (peso, altura) => {
  if (!peso || !altura) return null;
  const pesoNum = parseFloat(peso);
  const alturaCm = parseFloat(altura);
  if (isNaN(pesoNum) || isNaN(alturaCm) || alturaCm <= 0) return null;
  // Fórmula de Mosteller: SC (m²) = √((peso × altura)/3600)
  const superficie = Math.sqrt((pesoNum * alturaCm) / 3600);
  return superficie.toFixed(2);
};

export function EditFields({form, setForm, patient}) {
  const defaultValue = 'No informa';
  
  const currentBodySurface = calculateBodySurface(
    form.peso || patient.peso, 
    form.altura || patient.altura
  );

  const fields = [
    {
      id: 'peso',
      label: 'Peso',
      placeholder: 'Ingresa el peso del paciente (en kg)',
      savedLabel: 'Peso guardado',
      savedValue: patient.peso || defaultValue,
      hasInput: true,
      form: form.peso
    },
    {
      id: 'altura',
      label: 'Altura',
      placeholder: 'Ingresa la altura del paciente (en cm)',
      savedLabel: 'Altura guardada',
      savedValue: patient.altura || defaultValue,
      hasInput: true,
      form: form.altura
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
    {
      id: 'obra_social',
      label: 'Obra social',
      placeholder: 'Ingresa obra social del paciente',
      savedLabel: 'Obra social guardada',
      savedValue: patient.obra_social || defaultValue,
      hasInput: true,
      form: form.obra_social
    },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1.5fr]">
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
