/**
 * 受け取った関数 `func` を呼び出し、funcがtrueを返せばそこで終了する。
 * `func` が `false` を返した場合は以下の待ち時間後に `func` 呼び出しをリトライする。
 * 待ち時間は`func`の呼び出し回数に応じて1秒, 2秒, 4秒, ...と2倍に増えていく。
 * `maxRetry` 回リトライしても成功しない場合はそこで終了する。
 * `retryWithExponentialBackoff`に対する呼び出しは即座に完了し、`func` の呼び出しは非同期に行われる。
 * `func` が `true` を返す、またはmaxRetry回のリトライが失敗し終了する際、その結果(`true`/`false`)を引数として関数 `callback` が呼び出される。
 * @param {Function} func - リトライする関数
 * @param {number} maxRetry - 最大リトライ回数
 * @param {Function} callback - コールバック関数
 */
export function retryWithExponentialBackoff(func, maxRetry, callback) {
  let attempt = 0;

  function retry() {
    if (func()) {
      callback(true);
    } else if (attempt < maxRetry) {
      attempt++;
      setTimeout(retry, Math.pow(2, attempt) * 1000);
    } else {
      callback(false);
    }
  }

  retry();
}
