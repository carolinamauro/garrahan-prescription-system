import { apiClient } from './apiClient';

export async function fetchPatientRecipes(patientId) {
  try {
    const { data } = await apiClient.get(`/recetas/${patientId}`);
    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

export async function exportRecipe(patientData, type) {
  const { data: recipeIdData } = await apiClient.post('/recetas', patientData);
  const recipeId = recipeIdData.id;

  const result = await apiClient.get(`/recetas/${recipeId}/exportar`, {
    params: { tipo: type },
    responseType: 'blob'
  });

  return result.data;
}
