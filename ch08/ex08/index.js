/**
 * カウンターグループを作成する関数。
 * @returns {Object} - `newCounter`メソッドと`total`メソッドを持つオブジェクト
 */
export function counterGroup() {
  let total = 0; // すべてのカウンターの値の合計を格納
  const counters = []; // 作成されたすべてのカウンターを格納

  return {
    /**
     * 新しいカウンターを作成するメソッド。
     * @returns {Object} - `count`メソッドと`reset`メソッドを持つカウンターオブジェクト
     */
    newCounter: function () {
      let count = 0;
      counters.push(() => count);

      return {
        /**
         * カウンターの値をインクリメントするメソッド。
         * @returns {number} - インクリメント後のカウンターの値
         */
        count: function () {
          total++; // totalを1増やす
          return count++; // countの値を1増やし、その増やした値を返す
        },
        /**
         * カウンターの値をリセットするメソッド。
         */
        reset: function () {
          total -= count; // totalからcountの値を引く
          count = 0; // countの値を0にリセット
        },
      };
    },
    /**
     * これまでに作成されたすべてのカウンターの値の合計を返すメソッド。
     * @returns {number} - カウンターの値の合計
     */
    total: function () {
      return total;
    },
  };
}
