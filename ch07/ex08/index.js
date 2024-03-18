/**
 * 文字列の書記素を反転させる関数
 * @param {string} str - 反転させる文字列
 * @return {string} 書記素が反転した文字列
 */
export function reverse(str) {
  // 書記素単位で文字列を分割するsegmenterを作成
  // granularity: "grapheme"というオプションは、書記素単位で分割することを指定
  const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });

  // segmenter.segment(str)を使用して、文字列strを書記素単位で分割
  // その結果を配列に展開して、segmentsという新しい配列を作成
  const segments = [...segmenter.segment(str)];

  // segments配列の各要素（セグメント）に対して、segment.segment（セグメントの内容）を取り出す
  // その結果を新しい配列にして、その配列を反転
  // 最後に、反転させた配列の要素を連結して、新しい文字列を作成
  return segments
    .map((segment) => segment.segment)
    .reverse()
    .join("");
}
