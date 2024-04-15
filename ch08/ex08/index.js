/**
 * カウンターグループを作成する関数。
 * @returns {Object} - `newCounter`メソッドと`total`メソッドを持つオブジェクト
 */
export function counterGroup() {
  let total = 0;
  const counters = [];

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
          total++;
          return count++;
        },
        /**
         * カウンターの値をリセットするメソッド。
         */
        reset: function () {
          total -= count;
          count = 0;
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
