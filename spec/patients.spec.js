const { test, expect } = require('@playwright/test');

test('navegar a Pacientes muestra Gestión de Pacientes', async ({ page }) => {
  // Abrir la app
  await page.goto('/'); // Usa la baseURL del playwright.config

  // Hacer click en la solapa/menú "Pacientes"
  await page.click('text=Pacientes');

  // Verificar que redirige a /patients
  await expect(page).toHaveURL(/.*\/patients/);

  // Verificar que aparece el título
  await expect(page.
    getByText('Administra y visualiza todos los pacientes del sistema')).toBeVisible();
});
