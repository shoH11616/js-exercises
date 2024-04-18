const obj = {
  om: function () {
    const nest = {
      nm: function () {
        console.log(this === obj, this === nest);
        // thisは現在のコンテキストを参照するため、nmメソッドを呼び出した
        // オブジェクトを参照する。
      },
      arrow: () => {
        console.log(this === obj, this === nest);
        // アロー関数の場合、外側のthisを参照。
        // 今回はomメソッドを呼び出したobjオブジェクトを参照。
      },
    };
    nest.nm();
    nest.arrow();
  },
};
obj.om();
