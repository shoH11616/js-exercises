/**
 * 
 *   1) ch15.11-15\ex04\index.spec.js:20:3 › ToDo App › should save and load ToDo items from localStorage

    Error: Timed out 5000ms waiting for expect(locator).toHaveCount(expected)

    Locator: locator('#todo-list li')
    Expected: 2
    Received: 0
    Call log:
      - expect.toHaveCount with timeout 5000ms
      - waiting for locator('#todo-list li')
      -   locator resolved to 0 elements
      -   unexpected value "0"
      -   locator resolved to 0 elements
      -   unexpected value "0"
      -   locator resolved to 0 elements
      -   unexpected value "0"
      -   locator resolved to 0 elements
      -   unexpected value "0"
      -   locator resolved to 0 elements
      -   unexpected value "0"
      -   locator resolved to 0 elements
      -   unexpected value "0"
      -   locator resolved to 0 elements
      -   unexpected value "0"
      -   locator resolved to 0 elements
      -   unexpected value "0"
      -   locator resolved to 0 elements
      -   unexpected value "0"


      37 |     // ToDoアイテムがlocalStorageから正しく読み込まれることを確認
      38 |     const todoItems = await getTodoItems(page);
    > 39 |     await expect(todoItems).toHaveCount(2);
         |                             ^
      40 |     await expect(todoItems.nth(0)).toHaveText("Test ToDo 1");
      41 |     await expect(todoItems.nth(1)).toHaveText("Test ToDo 2");
      42 |   });


  2) ch15.11-15\ex04\index.spec.js:44:3 › ToDo App › should sync ToDo items across multiple tabs ───

    Error: Timed out 5000ms waiting for expect(locator).toHaveCount(expected)

    Locator: locator('#todo-list li')
    Expected: 1
    Received: 0
    Call log:
      - expect.toHaveCount with timeout 5000ms
      - waiting for locator('#todo-list li')
      -   locator resolved to 0 elements
      -   unexpected value "0"
      -   locator resolved to 0 elements
      -   unexpected value "0"
      -   locator resolved to 0 elements
      -   unexpected value "0"
      -   locator resolved to 0 elements
      -   unexpected value "0"
      -   locator resolved to 0 elements
      -   unexpected value "0"
      -   locator resolved to 0 elements
      -   unexpected value "0"
      -   locator resolved to 0 elements
      -   unexpected value "0"
      -   locator resolved to 0 elements
      -   unexpected value "0"
      -   locator resolved to 0 elements
      -   unexpected value "0"


      58 |     await page2.waitForLoadState("domcontentloaded"); // ページの読み込みを待機
      59 |     const todoItemsPage2 = await getTodoItems(page2);
    > 60 |     await expect(todoItemsPage2).toHaveCount(1);
         |                                  ^
      61 |     await expect(todoItemsPage2.nth(0)).toHaveText("Test ToDo 3");
      62 |
      63 |     await page1.close();
 */

import { test, expect } from "@playwright/test";

// テスト対象のページに移動する関数
async function gotoTestTarget(page) {
  await page.goto("/ch15.11-15/ex04/index.html");
  await page.waitForLoadState("domcontentloaded"); // ページの読み込みを待機
}

// ToDoリストのアイテムを取得する関数
function getTodoItems(page) {
  return page.locator("#todo-list li");
}

// ToDoリストの入力フィールドを取得する関数
function getInput(page) {
  return page.locator("#new-todo");
}

test.describe("ToDo App", () => {
  test("should save and load ToDo items from localStorage", async ({
    page,
  }) => {
    await gotoTestTarget(page);

    // ToDoアイテムを追加
    await getInput(page).fill("Test ToDo 1");
    await getInput(page).press("Enter");
    await page.waitForTimeout(500); // アイテムが追加されるまで待機
    await getInput(page).fill("Test ToDo 2");
    await getInput(page).press("Enter");
    await page.waitForTimeout(500); // アイテムが追加されるまで待機

    // ページをリロード
    await page.reload();
    await page.waitForLoadState("domcontentloaded"); // ページの読み込みを待機

    // ToDoアイテムがlocalStorageから正しく読み込まれることを確認
    const todoItems = await getTodoItems(page);
    await expect(todoItems).toHaveCount(2);
    await expect(todoItems.nth(0)).toHaveText("Test ToDo 1❌");
    await expect(todoItems.nth(1)).toHaveText("Test ToDo 2❌");
  });

  test("should sync ToDo items across multiple tabs", async ({ browser }) => {
    const page1 = await browser.newPage();
    const page2 = await browser.newPage();

    await gotoTestTarget(page1);
    await gotoTestTarget(page2);

    // Page1でToDoアイテムを追加
    await getInput(page1).fill("Test ToDo 3");
    await getInput(page1).press("Enter");
    await page1.waitForTimeout(500); // アイテムが追加されるまで待機

    // Page2でToDoアイテムが自動的に反映されることを確認
    await page2.reload(); // ページをリロードして変更を反映
    await page2.waitForLoadState("domcontentloaded"); // ページの読み込みを待機
    const todoItemsPage2 = await getTodoItems(page2);
    await expect(todoItemsPage2).toHaveCount(1);
    await expect(todoItemsPage2.nth(0)).toHaveText("Test ToDo 3");

    await page1.close();
    await page2.close();
  });

  test("should work without localStorage", async ({ page }) => {
    // localStorageを無効化
    await page.addInitScript(() => {
      Object.defineProperty(window, "localStorage", {
        value: null,
      });
    });

    await gotoTestTarget(page);

    // ToDoアイテムを追加
    await getInput(page).fill("Test ToDo 4");
    await getInput(page).press("Enter");
    await page.waitForTimeout(500); // アイテムが追加されるまで待機

    // ページをリロード
    await page.reload();
    await page.waitForLoadState("domcontentloaded"); // ページの読み込みを待機

    // ToDoアイテムがセッション中のみ保持されることを確認
    const todoItems = await getTodoItems(page);
    await expect(todoItems).toHaveCount(0);
  });
});
