import { EditField } from '@/components/PatientEditCard/EditFields/EditField';

const calculateBMI = (peso, altura) => {
  if (!peso || !altura) return null;
  const pesoNum = parseFloat(peso);
  const alturaMetros = parseFloat(altura) / 100;
  if (isNaN(pesoNum) || isNaN(alturaMetros) || alturaMetros <= 0) return null;
  return (pesoNum / (alturaMetros * alturaMetros)).toFixed(2);
};

export function EditFields({form, setForm, patient}) {
  const defaultValue = 'No informa';
  
  const currentBMI = calculateBMI(
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
      savedValue: currentBMI || 'No disponible',
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
