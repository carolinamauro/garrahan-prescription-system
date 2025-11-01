import { useState } from 'react';
import { exportRecipe } from '@/services/recipe';
import { calculateBodySurface } from '@/lib/utils';

export const useRecipeGenerator = () => {

  const [loading, setLoading] = useState(false);

  const generateRecipe = async (patient, medications, type) => {
    setLoading(true);
    try {
      const data = getPatientData(patient, medications);
      const blob = await exportRecipe(data, type);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receta_${patient.nombre.replace(/\s+/g, '_')}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getPatientData = (patient, medications) => {
    const data =
      {
        nombre: patient.nombre,
        apellido: patient.apellido,
        tipo_documento: '',
        numero_documento: '44.777.888', // TODO: patient.numero_documento,
        fecha_nacimiento: patient.fecha_nacimiento,
        sexo: patient.sexo,
        nacionalidad: '',
        domicilio_calle: '',
        domicilio_numero: '',
        localidad: '',
        telefono: '',
        email: '',
        peso: patient.peso,
        talla: patient.altura,
        superficie_corporal: patient.sup_corporal ?
          patient.sup_corporal : calculateBodySurface(patient.peso),
        diagnostico: patient.protocolo.nombre,
        numero_ciclo: patient.protocolo.ciclo_actual_id,
        protocolo_id: patient.protocolo.protocolo_id,
        ciclo_id: patient.protocolo.ciclo_actual_id,
        regimen: patient.protocolo.regimen,
        paciente_id: patient.paciente_id,
        profesional_id: 2, // TODO: id del profesional
        estado: 'Activo',
        detalles: []
      };

    const administraciones = patient.protocolo.administraciones;

    medications.forEach((med) => {
      const admin = administraciones.find(a => a.droga_id === med.droga_id);

      data.detalles.push({
        admin_id: admin.admin_id,
        nombre_generico: med.nombre,
        presentacion: med.presentation,
        concentracion: med.concentration,
        cantidad: med.total_units,
        dosis_diaria: admin.frecuencia_diaria,
        numero_dias: admin.cantidad_dias,
        dosis_total: med.total_dosis_amount,
        via_administracion: admin.via_administracion,
      });
    });

    return data;

  };

  return { generateRecipe, loading };
};
