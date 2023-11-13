
import { test, expect, chromium } from '@playwright/test';

async function login(page) {
  const user = process.env.USER;
  const val = process.env.VALUE;
  console.log(user);
  console.log(val);

  await page.goto('https://github.com/login');
  await page.locator('[id="login_field"]').fill(user);
  await page.locator('[id="password"]').fill(val);
  await page.locator('[name="commit"]').click();
  await page.locator('button.AppHeader-logo').click();
  await page.locator('a[href="https://gist.github.com/mine"]').first().click();
};


test('create private gist', async ({ page }) => {
  login(page)
  await page.getByLabel('Create new gist').click();
  await page.getByPlaceholder('Gist description…').fill('Desc');
  await page.getByPlaceholder('Filename including extension…').click();
  await page.getByPlaceholder('Filename including extension…').fill('test.txt');
  await page.locator('#code-editor').pressSequentially('Hello World!')
  await page.locator('button.hx_create-pr-button').click();
});

/*test('create public gist', async ({ page }) => {
  login(page)
  await page.getByLabel('Create new gist').click();
  await page.getByPlaceholder('Gist description…').fill('Desc');
  await page.getByPlaceholder('Filename including extension…').click();
  await page.getByPlaceholder('Filename including extension…').fill('test.txt');
  await  page.locator('#code-editor').pressSequentially('Hello World!')
  await page.locator('.select-menu-button').click();
  await page.locator('.select-menu-item-heading').last().click();
  await page.locator('button.hx_create-pr-button').click();
});

test('update public gist', async ({ page }) => {
  login(page)
  await page.getByRole('link', { name: 'test.txt' }).nth(1).click();
  await page.getByRole('link', { name: 'Edit this Gist' }).click();
  await  page.locator('#code-editor').pressSequentially('Update!!!')
  await  page.locator('button[type="submit"].btn-primary').click();  
});*/
