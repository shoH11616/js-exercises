// ジェネレーター関数
// function*キーワードを使用して定義。yield文に到達すると、その時点での値を返し、関数の実行を一時停止する。
// 次に関数が呼び出されると停止した箇所から再開する。

export function* fib() {
    // フィボナッチ数列の最初の2項を設定
    // prev ... 前の項, next ... 次の項
    let [prev, next] = [0, 1];
    // フィボナッチ数列は無限に続くため、無限ループを開始させる。
    while (true) {
      // 前の項に次の項を, 次の項には古いprevとnextの和を入れる
      [prev, next] = [next, prev + next];
      // フィボナッチ数を返す
      yield prev;
    }
  }