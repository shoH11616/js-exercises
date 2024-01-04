import { equals } from "./index.js";

test("Returns true when comparing objects with the same content", () => {
  let obj1 = { a: 1, b: 2, c: 3 } ;
  let obj2 = { a: 1, b: 2, c: 3 } ;
  expect(equals(obj1, obj2)).toBe(true); // => pass
});

test("Returns false when comparing objects with different contents", () => {
  let obj1 = { a: 1, b: 2 };
  let obj2 = { a: 1, b: 3 };
  expect(equals(obj1, obj2)).toBe(false); // => pass
});
