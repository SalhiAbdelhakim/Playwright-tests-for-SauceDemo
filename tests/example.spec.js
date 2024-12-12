// @ts-check
const { test, expect } = require('@playwright/test');

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });




test.describe(' Login Tests', () => {
  const baseURL = 'https://www.saucedemo.com/v1/';
  const users = [
      { username: 'standard_user', password: 'secret_sauce', expected: 'Products' },
      { username: 'locked_out_user', password: 'secret_sauce', expected: 'Epic sadface: Sorry, this user has been locked out.' },
      { username: 'problem_user', password: 'secret_sauce', expected: 'Products' },
      { username: 'performance_glitch_user', password: 'secret_sauce', expected: 'Products' },
  ];

  users.forEach(user => {
      test(`Login test for ${user.username}`, async ({ page }) => {
          // Aller sur le site
          await page.goto(baseURL);

          // Remplir le formulaire de connexion
          await page.fill('#user-name', user.username);
          await page.fill('#password', user.password);
          await page.click('#login-button');

          // Vérifier le résultat attendu
          if (user.expected === 'Products') {
              await expect(page.locator('.product_label')).toHaveText(user.expected);
          } else {
              await expect(page.locator('[data-test="error"]')).toHaveText(user.expected);
          }
           
            
        });
    });
});
