import { test, expect } from "@playwright/test";

function gotoTestTarget(page) {
  return page.goto("/ch15.11-15/ex04/index.html");
}

function getTodoInput(page) {
  return page.getByPlaceholder("What needs to be done?");
}

function getTodoList(page) {
  return page.locator("#todo-list");
}

test.describe("ToDo Application", () => {
  test("Should save ToDo list to localStorage and retain after reload", async ({
    page,
  }) => {
    await gotoTestTarget(page);
    await getTodoInput(page).fill("Test ToDo");
    await page.click("button:has-text('Add')");
    await page.reload();
    const todoList = await getTodoList(page).innerText();
    expect(todoList).toContain("Test ToDo");
  });

  test("Should reflect changes across multiple tabs", async ({ browser }) => {
    const context = await browser.newContext();
    const page1 = await context.newPage();
    const page2 = await context.newPage();
    await gotoTestTarget(page1);
    await gotoTestTarget(page2);

    await getTodoInput(page1).fill("Test ToDo");
    await page1.click("button:has-text('Add')");
    await page2.reload();
    const todoList = await getTodoList(page2).innerText();
    expect(todoList).toContain("Test ToDo");
  });

  test("Should work without errors when localStorage is disabled", async ({
    page,
  }) => {
    await page.context().addInitScript(() => {
      Object.defineProperty(window, "localStorage", {
        value: null,
      });
    });
    await gotoTestTarget(page);
    await getTodoInput(page).fill("Test ToDo");
    await page.click("button:has-text('Add')");
    const todoList = await getTodoList(page).innerText();
    expect(todoList).toContain("Test ToDo");
  });
});
