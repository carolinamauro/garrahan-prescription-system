/* global fetch */
import { API_BASE_URL } from '.';

export async function fetchPatientRecipes(patientId) {
  const recipes = fetch(`${API_BASE_URL}/recetas/${patientId}`)
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

  return recipes;
}
