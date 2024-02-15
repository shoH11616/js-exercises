import { escapeWithIfElse, escapeWithSwitch } from "./index.js";

const testStr1 = "\u0000\u0008\u0009\u000A\u000BHello";
const testStr2 = "\u000C\u000D\u0022\u0027\u005CWorld";

const expectedStr1 =  "\\0\\b\\t\\n\\vHello";
console.log(expectedStr1); // => \0\b\t\n\vHello
const expectedStr2 = "\\f" + "\\r" + '\\"' + "\\'" + "\\" + "\u005C" + "World";
console.log(expectedStr2); // => \f\r\"\'\\World

describe("escapeWithIfElse", () => {
  it("returns expectedStr1 for escapeWithIfElse(testStr1)", () => {
    expect(escapeWithIfElse(testStr1)).toBe(expectedStr1); // => pass
  });

  it("returns expectedStr2 for escapeWithIfElse(testStr2)", () => {
    expect(escapeWithIfElse(testStr2)).toBe(expectedStr2); // => pass
  });
});

describe("escapeWithSwitch", () => {
  it("returns expectedStr1 for escapeWithSwitch(testStr1)", () => {
    expect(escapeWithSwitch(testStr1)).toBe(expectedStr1); // => pass
  });

  it("returns expectedStr2 for escapeWithSwitch(testStr2)", () => {
    expect(escapeWithSwitch(testStr2)).toBe(expectedStr2); // => pass
  });
});
