/**
 * リソースを使用する処理を実行し、その後でリソースを解放する関数。
 * @param {Object} resource - リソースオブジェクト（`close`メソッドを持つ）
 * @param {Function} callback - リソースを使用する処理を記述したコールバック関数
 */
export function withResource(resource, callback) {
  try {
    // リソースを使用する処理を記述したコールバック関数を呼ぶ
    callback(resource);
  } finally {
    // エラーが発生したか同課に限らず、かならずcloseメソッドが呼び出される。
    resource.close();
  }
}
