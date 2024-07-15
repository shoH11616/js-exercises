export class Hiragana {
  constructor(char) {
    this.char = char;
    this.code = char.charCodeAt(0);
  }

  [Symbol.toPrimitive](hint) {
    if (hint === "string") {
      return this.char;
    } else if (hint === "number") {
      return this.code;
    } else {
      return this.char;
    }
  }
}
