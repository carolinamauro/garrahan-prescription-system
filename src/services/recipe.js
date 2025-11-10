import { API_BASE_URL, apiClient } from './apiClient';
import { formatDate } from '@/lib/utils';

export async function fetchPatientRecipes(patientId) {
  try {
    const { data } = await apiClient.get(`/recetas?paciente_id=${patientId}`);

    if (!data || data.length === 0) return [];

    return data.map(receta => ({
      ciclo_id: receta.contexto.ciclo_id,
      diagnostico: receta.diagnostico,
      fecha_solicitud_receta: formatDate(receta.fecha_prescripcion),
      receta_id: receta.id,
      tipo_receta: receta.tipo_receta
    }));
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

export function getRecipeUrl(recipeId, type) {
  return `${API_BASE_URL}/recetas/${recipeId}/exportar?tipo=${type}`;
}

export async function exportRecipe(patientData, type, setRecipes, camposExtraRecetaProvincia) {

  let recipeId = null;

  try {
    const { data: recipeIdData } = await apiClient.post('/recetas', {
      ...patientData,
      tipo_receta: type,
      ...(type === 'provincia' ? camposExtraRecetaProvincia : {})
    });

    recipeId = recipeIdData.id;

    const recipeData = {
      ...patientData,
      receta_id: recipeId,
      tipo_receta: type,
      fecha_solicitud_receta: formatDate(new Date().toISOString()),
      ...(type === 'provincia' ? camposExtraRecetaProvincia : {})
    };

    setRecipes((prevRecipes) => [
      ...prevRecipes,
      recipeData,
    ]);

    const result = await apiClient.get(`/recetas/${recipeId}/exportar`, {
      params: { tipo: type },
      responseType: 'blob'
    });

    return result.data;
  } catch (error) {
    if (recipeId) {
      try {
        await apiClient.delete(`/recetas/${recipeId}`);
      } catch (delErr) {
        console.error('Fallo el rollback (DELETE /recetas/:id):', delErr);
      }
    }
    throw error;
  }
}
