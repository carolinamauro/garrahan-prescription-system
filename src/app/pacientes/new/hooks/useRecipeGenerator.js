import { useState } from 'react';
import { exportRecipe } from '@/services/recipe';
import { calculateBodySurface } from '@/lib/utils';

export const useRecipeGenerator = () => {

  const [loading, setLoading] = useState(false);

  const generateRecipe = async (patientFullData, medications, type, setRecipes,
    camposExtraRecetaProvincia) => {
    setLoading(true);
    try {
      const {metaData, patient} = patientFullData;
      const data = getPatientData(metaData, patient, medications);
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

  const getPatientData = (metaData, patient, medications) => {
    const data =
      {
        nombre: metaData.nombre,
        apellido: metaData.apellido,
        tipo_documento: metaData.tipo_documento,
        numero_documento: metaData.numero_documento,
        fecha_nacimiento: metaData.fecha_nacimiento,
        sexo: metaData.sexo,
        nacionalidad: metaData.nacionalidad,
        domicilio_calle: metaData.domicilio_calle,
        domicilio_numero: metaData.domicilio_numero,
        domicilio_piso_depto: metaData.domicilio_piso_depto,
        codigo_postal: metaData.codigo_postal,
        localidad: metaData.localidad,
        partido: metaData.partido,
        telefono: metaData.telefono,
        email: metaData.email,
        peso: metaData.peso,
        talla: metaData.talla,
        superficie_corporal: metaData.sup_corporal ?
          metaData.sup_corporal : calculateBodySurface(metaData.peso),
        diagnostico: metaData.diagnostico,
        protocolo_id: patient.protocolo.protocolo_id,
        ciclo_id: patient.protocolo.ciclo_actual_id,
        regimen: patient.protocolo.regimen,
        paciente_id: patient.paciente_id,
        estado: 'activo',
        detalles: []
      };

    const administraciones = patient.protocolo.administraciones;

    medications.forEach((med) => {
      const admin = administraciones.find(
        a => a.droga_id === med.droga_id && a.admin_id === med.administracion_id
      );

      data.detalles.push({
        admin_id: admin.admin_id,
        nombre_generico: med.nombre,
        presentacion: med.presentation,
        concentracion: med.concentration,
        cantidad: med.total_units,
        dosis_diaria: `${med.dosis_diaria.valor} ${med.dosis_diaria.unidad}/m2`,
        numero_dias: admin.cantidad_dias,
        dosis_total: med.total_dosis_amount,
        dosis_unidad: med.total_dosis_unit,
        via_administracion: admin.via_administracion,
      });
    });

    return data;

  };

  return { generateRecipe, loading };
};
