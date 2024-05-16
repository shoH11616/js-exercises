/**
 * 特定の年と月を数値の引数で受け取り、その月の日数を返す関数
 * @param {number} year - 年
 * @param {number} month - 月 (1-12)
 * @returns {number} - その月の日数
 */
export function getDaysInMonth(year, month) {
  // 指定された月の0日目（前月の最終日）の日付を取得し、その月の日数を求める
  return new Date(year, month, 0).getDate();
}

/**
 * 期間の開始日と終了日を'YYYY-MM-DD'形式の日付で二つ引数で受け取り、その期間の土日以外の日数を返す関数
 * @param {string} startDate - 開始日 ('YYYY-MM-DD'形式)
 * @param {string} endDate - 終了日 ('YYYY-MM-DD'形式)
 * @returns {number} - その期間の土日以外の日数
 */
export function countWeekdays(startDate, endDate) {
  // 開始日をDateオブジェクトに変換
  const start = new Date(startDate);
  // 終了日をDateオブジェクトに変換
  const end = new Date(endDate);
  let count = 0; // 平日の日数をカウントする変数

  // 開始日から終了日までループを回し、各日にちの曜日をチェック
  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    const day = d.getDay(); // 曜日を取得
    if (day !== 0 && day !== 6) {
      // 0: Sunday, 6: Saturday
      count++;
    }
  }

  return count;
}

/**
 * 'YYYY-MM-DD'形式の日付とロケールを引数で受け取り、その日の曜日をロケールの形式の文字列で返す関数
 * @param {string} date - 日付 ('YYYY-MM-DD'形式)
 * @param {string} locale - ロケール
 * @returns {string} - その日の曜日をロケールの形式で表した文字列
 */
export function getDayOfWeek(date, locale) {
  const d = new Date(date); // 日付をDateオブジェクトに変換
  // toLocaleDateStringメソッドを使用して、ロケールに応じた曜日の名前を取得
  return d.toLocaleDateString(locale, { weekday: "long" });
}

/**
 * ローカルのタイムゾーンにおいて先月 1 日 0 時 0 分 0 秒の Date オブジェクトを返す関数
 * @returns {Date} - 先月 1 日 0 時 0 分 0 秒の Date オブジェクト
 */
export function getFirstDayOfLastMonth() {
  const now = new Date();
  now.setDate(1); // 今月の1日を取得
  now.setDate(now.getDate() - 1); // 1日引いて先月の最終日を取得
  now.setDate(1); // 先月の1日を取得
  now.setHours(0, 0, 0, 0); // 時間を0時0分0秒に設定
  return now;
}
