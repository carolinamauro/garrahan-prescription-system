import { useState } from 'react';
import { exportRecipe } from '@/services/recipe';
import { calculateBodySurface } from '@/lib/utils';

export const useRecipeGenerator = () => {

  const [loading, setLoading] = useState(false);

  const generateRecipe = async (patient, medications, type, setRecipes,
    camposExtraRecetaProvincia) => {
    setLoading(true);
    try {
      const data = getPatientData(patient, medications);
      const pdfData = await exportRecipe(data, type, setRecipes, camposExtraRecetaProvincia);

      const blobUrl = window.URL.createObjectURL(pdfData);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `receta_${patient.nombre.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);

    } catch (error) {
      console.error('Error al generar receta:', error);
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
        tipo_documento: patient.tipo_documento,
        numero_documento: patient.numero_documento,
        fecha_nacimiento: patient.fecha_nacimiento,
        sexo: patient.sexo,
        nacionalidad: patient.nacionalidad,
        domicilio_calle: patient.domicilio_calle,
        domicilio_numero: patient.domicilio_numero,
        domicilio_piso_depto: patient.domicilio_piso_depto,
        codigo_postal: patient.codigo_postal,
        localidad: patient.domicilio_localidad,
        partido: patient.partido,
        telefono: patient.telefono,
        email: patient.email,
        peso: patient.peso,
        talla: patient.altura,
        superficie_corporal: patient.sup_corporal ?
          patient.sup_corporal : calculateBodySurface(patient.peso),
        diagnostico: patient.diagnostico,
        numero_ciclo: patient.protocolo.ciclo_actual_id,
        protocolo_id: patient.protocolo.protocolo_id,
        ciclo_id: patient.protocolo.ciclo_actual_id,
        regimen: patient.protocolo.regimen,
        paciente_id: patient.paciente_id,
        profesional_id: 2,
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
