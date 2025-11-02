import { useState, useCallback } from 'react';
import { usePatients } from '@/contexts/PatientContext';
import { calculateBodySurface } from '@/lib/utils';

export function usePatientForm(patient) {
  const { updatePatient } = usePatients();
  const [showDialog, setShowDialog] = useState(false);

  const [form, setForm] = useState({
    peso: patient.peso || '',
    altura: patient.altura || '',
    ultima_modificacion: patient.ultima_modificacion || '',
    obra_social: patient.obra_social || '',
  });

  const handleSave = useCallback(async () => {
    const pesoCambiado = form.peso !== '' && form.peso !== patient.peso;
    const alturaCambiada = form.altura !== '' && form.altura !== patient.altura;
    const datosModificados = pesoCambiado || alturaCambiada;

    const pesoFinal = form.peso === '' ? patient.peso : form.peso;
    const alturaFinal = form.altura === '' ? patient.altura : form.altura;

    const updatedForm = {
      ...form,
      peso: pesoFinal,
      altura: alturaFinal,
      sup_corporal: calculateBodySurface(pesoFinal),
      obra_social: form.obra_social === '' ? patient.obra_social : form.obra_social,
      ultima_modificacion: datosModificados ? new Date() : patient.ultima_modificacion,
    };

    await updatePatient(patient.paciente_id, updatedForm);
    setForm(updatedForm);
    setShowDialog(true);
  }, [form, patient, updatePatient]);

  return { form, setForm, handleSave, showDialog, setShowDialog };
}
