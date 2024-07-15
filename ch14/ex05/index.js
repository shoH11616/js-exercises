/**
 * テンプレートリテラルを受け取り、補間値の型名を文字列として返す関数
 * @param {Array} literals - テンプレートリテラルの文字列部分の配列
 * @param {Array} expressions - テンプレートリテラルの補間値部分の配列
 * @returns {string} 補間値の型名を展開した文字列
 */
export function expandType(literals, ...expressions) {
  let result = "";

  for (let i = 0; i < literals.length; i++) {
    result += literals[i];
    if (i < expressions.length) {
      result += typeof expressions[i];
    }
  }

  return result;
}
