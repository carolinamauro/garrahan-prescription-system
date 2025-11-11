'use client';

import { useState } from 'react';
import {calculateBodySurface} from '@/lib/utils';

const REQUIRED_FIELDS = ['nombre', 'apellido', 'id_hospitalario', 'fecha_nacimiento', 'protocolo',
  'ciclo', 'peso'];

export function usePatientForm() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    id_hospitalario: '',
    fecha_nacimiento: '',
    protocolo: '',
    ciclo: '',
    peso: '',
    obra_social: '',
    sup_corporal: '',
    altura: ''
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));

    if (id === 'peso') {
      console.log('Calculando sup corporal con peso: ', value, '');
      const peso = parseFloat(value);
      setForm((f) => ({ ...f, sup_corporal: calculateBodySurface(peso) }));
    }
  };

  const validate = () => {
    const missing = [];
    REQUIRED_FIELDS.forEach((k) => {
      if (form[k] === '' || form[k] === null) missing.push(k);
    });
    // peso must be float
    if (form.peso !== '' && isNaN(parseFloat(form.peso))) missing.push('peso (debe ser numérico)');
    setErrors(missing);
    return missing.length === 0;
  };

  return {
    form,
    setForm,
    errors,
    handleChange,
    validate
  };
}
