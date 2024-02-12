// テストが働かなかった

import { escapeWithIfElse, escapeWithSwitch } from "./index.js";

describe("Escape functions", function () {
  const testCases = [
    { input: "0", expected: "\0" },
    { input: "b", expected: "\b" },
    { input: "t", expected: "\t" },
    { input: "n", expected: "\n" },
    { input: "v", expected: "\v" },
    { input: "f", expected: "\f" },
    { input: "r", expected: "\r" },
    { input: '"', expected: '\\"' },
    { input: "'", expected: "\\'" },
    { input: "\u005c", expected: "\\\\" },
  ];

  describe("escapeWithIfElse", function () {
    for (const { input, expected } of testCases) {
      it(`should escape "${input}" as "${expected}"`, function () {
        expect(escapeWithIfElse(input)).toEqual(expected);
      });
    }
  });

  describe("escapeWithSwitch", function () {
    for (const { input, expected } of testCases) {
      it(`should escape "${input}" as "${expected}"`, function () {
        expect(escapeWithSwitch(input)).toEqual(expected);
      });
    }
  });
});
