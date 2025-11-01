/* global fetch */
import { API_BASE_URL } from '.';

export async function fetchPatientRecipes(patientId) {
  return fetch(`${API_BASE_URL}/recetas/${patientId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error fetching recipes:', error);
      return [];
    });
}

export async function exportRecipe(patientData, type) {
  const res = await fetch(`${API_BASE_URL}/recetas`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patientData),
  });

  if (!res.ok) throw new Error('Error al generar receta');
  const recipeId = await res.json().then(data => data.id);
  const result = await fetch(`${API_BASE_URL}/recetas/${recipeId}/exportar?tipo=${type}`, {
    method: 'GET',
    credentials: 'include'
  });

  return result.blob();
}
