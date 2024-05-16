/**
 * 日本語文字列の配列を受け取り、文字列中の大文字・小文字("つ"と"っ"等)、濁点・半濁点("は"と"ば"と"ば"等)の違いを無視してソートする関数
 * @param {string[]} arr - ソートする日本語文字列の配列
 * @return {string[]} - ソートされた日本語文字列の配列
 */
export function sortJapanese(arr) {
  // 文字列の正規化を行い、大文字・小文字や濁点・半濁点の違いを無視
  const normalizedArr = arr.map((str) => str.normalize("NFKC"));
  // 文字列をソート
  return normalizedArr.sort();
}

/**
 * Date オブジェクトを受け取り、`令和6年4月2日` のように `(和暦)y年m月d日` のフォーマットで日付の文字列を返す関数
 * @param {Date} date - 和暦に変換する Date オブジェクト
 * @return {string} - 和暦の日付文字列
 */
export function toJapaneseDateString(date) {
  // Dateオブジェクトから年、月、日を取得
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonthは0から始まるため、1を足す
  const day = date.getDate();

  // 和暦の元号と年を格納する変数を宣言
  let era = "";
  let eraYear = 0;

  // 以下の条件分岐で、西暦の日付を和暦の元号と年に変換
  if (year === 2019 && month === 4 && day === 30) {
    // 2019年4月30日は平成の最終日
    era = "平成";
    eraYear = year - 1988;
  } else if (
    year > 2019 ||
    (year === 2019 && month > 4) ||
    (year === 2019 && month === 4 && day >= 1)
  ) {
    // 2019年5月1日以降は令和
    era = "令和";
    eraYear = year - 2018; // 令和元年は2019年なので、2018を引く
  } else if (
    year > 1989 ||
    (year === 1989 && month > 1) ||
    (year === 1989 && month === 1 && day >= 8)
  ) {
    // 1989年1月8日から2019年4月30日までは平成
    era = "平成";
    eraYear = year - 1988;
  } else if (
    year > 1926 ||
    (year === 1926 && month > 12) ||
    (year === 1926 && month === 12 && day >= 25)
  ) {
    // 1926年12月25日から1989年1月7日までは昭和
    era = "昭和";
    eraYear = year - 1925;
  } else if (
    year > 1912 ||
    (year === 1912 && month > 7) ||
    (year === 1912 && month === 7 && day >= 30)
  ) {
    // 1912年7月30日から1926年12月24日までは大正
    era = "大正";
    eraYear = year - 1911;
  } else {
    // 1868年10月23日から1912年7月29日までは明治
    era = "明治";
    eraYear = year - 1867;
  }

  // 元年の場合は「元年」と表示する
  const eraYearString = eraYear === 1 ? "元年" : `${eraYear}年`;

  return `${era}${eraYearString}${month}月${day}日`;
}
