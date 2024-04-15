import { Warrior1, MagicWarrior1, Warrior2, MagicWarrior2 } from "./index.js";

describe("Warrior1", () => {
  it("returns 20 for the first call of attack", () => {
    const warrior1 = new Warrior1(10);
    expect(warrior1.attack()).toBe(20); // => pass
  });
});

describe("MagicWarrior1", () => {
  it("returns 30 for the first call of attack", () => {
    const magicWarrior1 = new MagicWarrior1(10, 10);
    expect(magicWarrior1.attack()).toBe(30); // => pass
  });
});

describe("Warrior2", () => {
  it("returns 20 for the first call of attack", () => {
    const warrior2 = new Warrior2(10);
    expect(warrior2.attack()).toBe(20); // => pass
  });
});

describe("MagicWarrior2", () => {
  it("returns 30 for the first call of attack", () => {
    const magicWarrior2 = new MagicWarrior2(10, 10);
    expect(magicWarrior2.attack()).toBe(30); // => pass
  });
});
