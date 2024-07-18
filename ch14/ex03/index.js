// 未回答。テストを突破できなかった。

/**
 * 合成可能なダイアクリティカルマークを無視して文字列比較を行うクラス
 */
export class IgnoreAccentPattern {
  constructor(pattern) {
    this.pattern = this.removeAccents(pattern);
  }

  /**
   * 文字列から合成可能なダイアクリティカルマークを除去します
   * @param {string} str - ダイアクリティカルマークを除去する文字列
   * @returns {string} ダイアクリティカルマークが除去された文字列
   */
  removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  /**
   * 文字列を検索します
   * @param {string} str - 検索対象の文字列
   * @returns {number} 検索パターンが見つかった最初の位置。見つからなかった場合は-1
   */
  search(str) {
    const normalizedStr = this.removeAccents(str);
    const normalizedPattern = this.removeAccents(this.pattern.toString());
    return normalizedStr.search(new RegExp(normalizedPattern, "i"));
  }

  /**
   * 文字列がパターンと一致するかどうかを確認します
   * @param {string} str - 一致を確認する文字列
   * @returns {Array|null} 一致する部分の配列。一致しない場合はnull
   */
  match(str) {
    const normalizedStr = this.removeAccents(str);
    const normalizedPattern = this.removeAccents(this.pattern.toString());
    return normalizedStr.match(new RegExp(normalizedPattern, "gi"));
  }
}
