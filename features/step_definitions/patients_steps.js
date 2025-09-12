import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { chromium } from 'playwright';

let browser, page;

Given('que estoy en la página principal', async function () {
  browser = await chromium.launch();
  const context = await browser.newContext({ baseURL: process.env.BASE_URL || 'http://localhost:3000' });
  page = await context.newPage();
  await page.goto('/');
});

When('hago clic en {string} en el menú', async function (texto) {
  await page.click(`text=${texto}`);
});

Then('debería navegar a {string}', async function (url) {
  await expect(page).toHaveURL(new RegExp(url));
});

Then('debería ver el texto {string}', async function (texto) {
  await expect(page.getByText(texto)).toBeVisible();
  await browser.close();
});
