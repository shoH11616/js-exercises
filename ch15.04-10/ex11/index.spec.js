import { test, expect } from "@playwright/test";

test.describe("Simple ToDo App", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ch15.04-10/ex11/index.html");
  });

  // 新しいToDoを追加するテスト
  test("should add new todo", async ({ page }) => {
    await page.fill("#new-todo", "新しいToDo");
    await page.click("button");

    const todoItems = await page.locator("#todo-list li");
    expect(await todoItems.count()).toBe(1);
    expect(await todoItems.first().locator(".content").textContent()).toBe(
      "新しいToDo"
    );
  });

  // ToDoを完了としてマークするテスト
  test("should mark todo as completed", async ({ page }) => {
    await page.fill("#new-todo", "新しいToDo");
    await page.click("button");

    const toggle = await page.locator("#todo-list li .toggle");
    await toggle.check();

    const todoItem = await page.locator("#todo-list li");
    expect(await todoItem.first().locator(".completed")).toBeTruthy();
  });

  // アクティブなToDoをフィルタリングするテスト
  test("should filter active todos", async ({ page }) => {
    await page.fill("#new-todo", "ToDo 1");
    await page.click("button");
    await page.fill("#new-todo", "ToDo 2");
    await page.click("button");

    const toggle = await page.locator("#todo-list li .toggle").first();
    await toggle.check();

    await page.click('a[href="#/active"]');

    const todoItems = await page.locator("#todo-list li");
    expect(await todoItems.count()).toBe(1);
    expect(await todoItems.first().locator(".content").textContent()).toBe(
      "ToDo 2"
    );
  });

  // 完了したToDoをフィルタリングするテスト
  test("should filter completed todos", async ({ page }) => {
    await page.fill("#new-todo", "ToDo 1");
    await page.click("button");
    await page.fill("#new-todo", "ToDo 2");
    await page.click("button");

    const toggle = await page.locator("#todo-list li .toggle").first();
    await toggle.check();

    await page.click('a[href="#/completed"]');

    const todoItems = await page.locator("#todo-list li");
    expect(await todoItems.count()).toBe(1);
    expect(await todoItems.first().locator(".content").textContent()).toBe(
      "ToDo 1"
    );
  });

  // ToDoを削除するテスト
  test("should delete todo", async ({ page }) => {
    await page.fill("#new-todo", "新しいToDo");
    await page.click("button");

    const destroyButton = await page.locator("#todo-list li .destroy");
    await destroyButton.click();

    const todoItems = await page.locator("#todo-list li");
    expect(await todoItems.count()).toBe(0);
  });
});
