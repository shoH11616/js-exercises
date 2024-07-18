/**
 * 'Hiragana'クラスをエクスポートする。このクラスはひらがなの文字とその文字コードを保持する。
 */
export class Hiragana {
  constructor(char) {
    // ひらがなの文字を保持
    this.char = char;
    // ひらがなの文字コードを保持
    this.code = char.charCodeAt(0);
  }
  /**
   * 'Symbol.toPrimitive'メソッドをオーバーライドする。このメソッドはオブジェクトをプリミティブ値に変換するために使う。
   * @param {string} hint - プリミティブ値の種類を示すヒント（"string"または"number"）
   * @returns {string|number} - ヒントが"string"ならひらがなの文字、"number"なら文字コードを返す。それ以外ならひらがなの文字を返す。
   */
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
