import { test, expect } from "@playwright/test";

test.describe("Product List Site", () => {
  // カテゴリを選択したときに、そのカテゴリの製品のみが表示されることをテスト
  test("When select a category, only the products of that category are displayed", async ({
    page,
  }) => {
    await page.goto("/ch15.01-03/ex14/index.html", {
      waitUntil: "domcontentloaded",
    });

    // Select 'food' category
    await page.selectOption("#category-select", "food");
    // 'food1'が表示されていて、'stationery1'と'stationery2'が表示されていないことを確認
    expect(await page.isVisible('li[data-testid="food1"]')).toBe(true);
    expect(await page.isVisible('li[data-testid="stationery1"]')).toBe(false);
    expect(await page.isVisible('li[data-testid="stationery2"]')).toBe(false);

    // Select 'stationery' category
    await page.selectOption("#category-select", "stationery");
    // 'food1'が表示されていなくて、'stationery1'と'stationery2'が表示されていることを確認
    expect(await page.isVisible('li[data-testid="food1"]')).toBe(false);
    expect(await page.isVisible('li[data-testid="stationery1"]')).toBe(true);
    expect(await page.isVisible('li[data-testid="stationery2"]')).toBe(true);

    // Select 'all' category
    await page.selectOption("#category-select", "all");
    // 'food1'、'stationery1'、'stationery2'がすべて表示されていることを確認
    expect(await page.isVisible('li[data-testid="food1"]')).toBe(true);
    expect(await page.isVisible('li[data-testid="stationery1"]')).toBe(true);
    expect(await page.isVisible('li[data-testid="stationery2"]')).toBe(true);
  });
});
