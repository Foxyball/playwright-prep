import { test, expect } from "@playwright/test";

test("Login with valid credentials", async ({ page }) => {
  await page.goto("https://budget.balikgstudio.eu/login");

  await page.getByLabel("Email address").fill("thefoxybg@gmail.com");

  await page.getByLabel("Password").fill("123"); // Invalid password

  await page.getByText("Log in").click();

  await expect(page).toHaveURL("https://budget.balikgstudio.eu/");

  await expect(page.locator(".topbar-title")).toHaveText("Dashboard");
});


test("Record a transaction", async ({ page }) => {
    
    await page.goto("https://budget.balikgstudio.eu/login");

    await page.getByLabel("Email address").fill("thefoxybg@gmail.com");

    await page.getByLabel("Password").fill("123"); // Invalid password

    await page.getByText("Log in").click();

    await expect(page).toHaveURL("https://budget.balikgstudio.eu/");

    await page.getByRole("button", {name: "Transactions"}).click();

    await page.getByRole("link", {name: "All", exact: true}).click();

    await expect(page).toHaveURL("https://budget.balikgstudio.eu/budget/transactions");

    await page.getByRole("link", {name: "Record a transaction"}).click();

    await page.locator('label[for="transaction_type_1"]').click();

    await page.locator('input[name="transaction[amount]"]').fill("100");

    await page.locator('#transaction_account_id').selectOption({ label: "Main" });

    await page.locator('#transaction_category_id').selectOption({ label: "Salary" });

    await page.locator('input[name="transaction[date_transaction]"]').fill("27.09.2026");

    await page.getByRole("button", {name: "Store transaction"}).click();

    await expect(page.getByText("Transaction has been recorded.")).toBeVisible();
});