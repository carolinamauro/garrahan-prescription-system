import { API_BASE_URL, apiClient } from './apiClient';
import { formatDate } from '@/lib/utils';

export async function fetchPatientRecipes(patientId) {
  try {
    const { data } = await apiClient.get(`/recetas?paciente_id=${patientId}`);

    if (!data || data.length === 0) return [];

    return data.map(receta => ({
      numero_ciclo: receta.contexto.numero_ciclo,
      diagnostico: receta.diagnostico,
      fecha_solicitud_receta: formatDate(receta.fecha_prescripcion),
      receta_id: receta.id,
      tipo_receta: 'hospitalaria' // TODO: definir el tipo de la receta desde backend
    }));
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

export function getRecipeUrl(recipeId, type) {
  return `${API_BASE_URL}/recetas/${recipeId}/exportar?tipo=${type}`;
}

export async function exportRecipe(patientData, type, setRecipes) {
  const { data: recipeIdData } = await apiClient.post('/recetas', patientData);
  const recipeId = recipeIdData.id;

  const recipeData = {
    ...patientData,
    receta_id: recipeId,
    tipo_receta: type,
    fecha_solicitud_receta: formatDate(new Date().toISOString())
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
}
