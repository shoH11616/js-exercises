/**
 * 
 *   2) ch15.11-15\ex06\index.spec.js:90:3 › ToDo App › When a task is added in one tab, it should appear in another tab

    Error: Timed out 5000ms waiting for expect(locator).toHaveText(expected)

    Locator: locator('#todo-list')
    Expected string: "Sync Task❌"
    Received string: ""
    Call log:
      - expect.toHaveText with timeout 5000ms
      - waiting for locator('#todo-list')
      -   locator resolved to <ul id="todo-list"></ul>
      -   unexpected value ""
      -   locator resolved to <ul id="todo-list"></ul>
      -   unexpected value ""
      -   locator resolved to <ul id="todo-list"></ul>
      -   unexpected value ""
      -   locator resolved to <ul id="todo-list"></ul>
      -   unexpected value ""
      -   locator resolved to <ul id="todo-list"></ul>
      -   unexpected value ""
      -   locator resolved to <ul id="todo-list"></ul>
      -   unexpected value ""
      -   locator resolved to <ul id="todo-list"></ul>
      -   unexpected value ""
      -   locator resolved to <ul id="todo-list"></ul>
      -   unexpected value ""
      -   locator resolved to <ul id="todo-list"></ul>
      -   unexpected value ""


      101 |     await page1.locator("#new-todo-form").press("Enter");
      102 |
    > 103 |     await expect(getTodoList(page2)).toHaveText("Sync Task❌");
          |                                      ^
      104 |   });
      105 | });
      106 |
 */

import { test, expect } from "@playwright/test";

/**
 * テスト対象のページに移動する関数
 * @param {Page} page - Playwrightのページオブジェクト
 * @returns {Promise<void>}
 */
function gotoTestTarget(page) {
  return page.goto("/ch15.11-15/ex06/index.html");
}

/**
 * ToDoリストの要素を取得する関数
 * @param {Page} page - Playwrightのページオブジェクト
 * @returns {Locator}
 */
function getTodoList(page) {
  return page.locator("#todo-list");
}

/**
 * 新しいタスクの入力フィールドを取得する関数
 * @param {Page} page - Playwrightのページオブジェクト
 * @returns {Locator}
 */
function getInput(page) {
  return page.locator("#new-todo");
}

test.describe("ToDo App", () => {
  /**
   * 新しいタスクが追加されたときにリストに表示されることを確認するテスト
   */
  test("When a new task is added, it should be displayed in the list", async ({
    page,
  }) => {
    await gotoTestTarget(page);
    await getInput(page).fill("New Task");
    await page.locator("#new-todo-form").press("Enter");
    await expect(getTodoList(page)).toHaveText("New Task❌");
  });

  /**
   * ページがリロードされてもタスクが保持されることを確認するテスト
   */
  test("When the page is reloaded, the tasks should be preserved", async ({
    page,
  }) => {
    await gotoTestTarget(page);
    await getInput(page).fill("Persistent Task");
    await page.locator("#new-todo-form").press("Enter");
    await page.reload();
    await expect(getTodoList(page)).toHaveText("Persistent Task❌");
  });

  /**
   * タスクが完了としてマークされたときに適切にスタイルが適用されることを確認するテスト
   */
  test("When a task is marked as completed, it should be styled accordingly", async ({
    page,
  }) => {
    await gotoTestTarget(page);
    await getInput(page).fill("Complete Task");
    await page.locator("#new-todo-form").press("Enter");
    await page
      .locator("li:has-text('Complete Task') input[type='checkbox']")
      .check();
    await expect(page.locator("li:has-text('Complete Task') label")).toHaveCSS(
      "text-decoration-line",
      "line-through"
    );
  });

  /**
   * タスクが削除されたときにリストから削除されることを確認するテスト
   */
  test("When a task is deleted, it should be removed from the list", async ({
    page,
  }) => {
    await gotoTestTarget(page);
    await getInput(page).fill("Delete Task");
    await page.locator("#new-todo-form").press("Enter");
    await page.locator("li:has-text('Delete Task') button").click();
    await expect(getTodoList(page)).not.toHaveText("Delete Task");
  });

  /**
   * あるタブで追加されたタスクが他のタブにも表示されることを確認するテスト
   */
  test("When a task is added in one tab, it should appear in another tab", async ({
    browser,
  }) => {
    const context = await browser.newContext();
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    await gotoTestTarget(page1);
    await gotoTestTarget(page2);

    await getInput(page1).fill("Sync Task");
    await page1.locator("#new-todo-form").press("Enter");

    await expect(getTodoList(page2)).toHaveText("Sync Task❌");
  });
});
