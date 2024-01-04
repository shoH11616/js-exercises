const hundredPointsSymbol = "💯";
const emojiLength = hundredPointsSymbol.length;
console.log(emojiLength); // => 2
console.log("\uD83D\uDCAF");
console.log("\u{0001F4AF}");

it("Check length of hundredPointsSymbol", () => {
  expect(emojiLength).toBe(2); // => pass
});

it("Check \uD83D\uDCAF equal hundredPointsSymbol", () => {
  expect("\uD83D\uDCAF" === hundredPointsSymbol).toBe(true); // => pass
});

it("Check \u{0001F4AF} equal hundredPointsSymbol", () => {
  expect("\u{0001F4AF}" === hundredPointsSymbol).toBe(true); // => pass
});
