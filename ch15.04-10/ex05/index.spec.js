/* 1) ch15.04-10\ex05\index.spec.js:13:3 › Custom Inline Circle Element › should have correct border colors

Error: locator.evaluate: TypeError: Cannot read properties of null (reading 'querySelector')

上記のエラーを超えられなかった。 */

import { expect, test } from "@playwright/test";

test.describe("Custom Inline Circle Element", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ch15.04-10/ex05/index.html");
  });

  test("should render inline-circle elements", async ({ page }) => {
    const circles = await page.locator("inline-circle");
    expect(await circles.count()).toBe(3);
  });

  test("should have correct border colors", async ({ page }) => {
    const redCircle = await page.locator("inline-circle").nth(0);
    const blueCircle = await page.locator("inline-circle").nth(1);
    const greenCircle = await page.locator("inline-circle").nth(2);

    const redBorderColor = await redCircle.evaluate((el) => {
      const shadowRoot = el.shadowRoot;
      const circle = shadowRoot.querySelector("div");
      return getComputedStyle(circle).borderColor;
    });
    const blueBorderColor = await blueCircle.evaluate((el) => {
      const shadowRoot = el.shadowRoot;
      const circle = shadowRoot.querySelector("div");
      return getComputedStyle(circle).borderColor;
    });
    const greenBorderColor = await greenCircle.evaluate((el) => {
      const shadowRoot = el.shadowRoot;
      const circle = shadowRoot.querySelector("div");
      return getComputedStyle(circle).borderColor;
    });

    expect(redBorderColor).toBe("rgb(255, 0, 0)");
    expect(blueBorderColor).toBe("rgb(0, 0, 255)");
    expect(greenBorderColor).toBe("rgb(0, 128, 0)");
  });

  test("should have correct dimensions", async ({ page }) => {
    const circle = await page.locator("inline-circle").first();
    const width = await circle.evaluate((el) => {
      const shadowRoot = el.shadowRoot;
      const circle = shadowRoot.querySelector("div");
      return getComputedStyle(circle).width;
    });
    const height = await circle.evaluate((el) => {
      const shadowRoot = el.shadowRoot;
      const circle = shadowRoot.querySelector("div");
      return getComputedStyle(circle).height;
    });

    expect(width).toBe("50px");
    expect(height).toBe("50px");
  });

  test("should be inline-block", async ({ page }) => {
    const circle = await page.locator("inline-circle").first();
    const display = await circle.evaluate((el) => {
      const shadowRoot = el.shadowRoot;
      const circle = shadowRoot.querySelector("div");
      return getComputedStyle(circle).display;
    });

    expect(display).toBe("inline-block");
  });
});
