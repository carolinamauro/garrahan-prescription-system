import { apiClient } from './apiClient';
import {formatDate} from '@/lib/utils';

export async function fetchPatientRecipes(patientId) {
  try {
    const { data } = await apiClient.get(`/recetas/${patientId}`);
    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

export async function exportRecipe(patientData, type, setRecipes) {
  const { data: recipeIdData } = await apiClient.post('/recetas', patientData);
  const recipeId = recipeIdData.id;

  const recipeData = {
    ...patientData,
    receta_id: recipeId,
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
