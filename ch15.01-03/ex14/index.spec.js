import { test, expect } from "@playwright/test";

test.describe("Product List Site", () => {
  test("When select a category, only the products of that category are displayed", async ({
    page,
  }) => {
    await page.goto("/ch15.01-03/ex14/index.html", {
      waitUntil: "domcontentloaded",
    });

    // Select 'food' category
    await page.selectOption("#category-select", "food");
    expect(await page.isVisible('li[data-testid="food1"]')).toBe(true);
    expect(await page.isVisible('li[data-testid="stationery1"]')).toBe(false);
    expect(await page.isVisible('li[data-testid="stationery2"]')).toBe(false);

    // Select 'stationery' category
    await page.selectOption("#category-select", "stationery");
    expect(await page.isVisible('li[data-testid="food1"]')).toBe(false);
    expect(await page.isVisible('li[data-testid="stationery1"]')).toBe(true);
    expect(await page.isVisible('li[data-testid="stationery2"]')).toBe(true);

    // Select 'all' category
    await page.selectOption("#category-select", "all");
    expect(await page.isVisible('li[data-testid="food1"]')).toBe(true);
    expect(await page.isVisible('li[data-testid="stationery1"]')).toBe(true);
    expect(await page.isVisible('li[data-testid="stationery2"]')).toBe(true);
  });
});
