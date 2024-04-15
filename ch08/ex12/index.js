/**
 * 関数の本体を文字列として受け取り、その文字列を本体とする新しい関数を返す関数。
 * @param {string} body - 関数の本体を表す文字列（`$1`, `$2`, ..., `$10`で引数を表現）
 * @returns {Function} - 新しい関数
 */
export function f(body) {
  const args = ["$1", "$2", "$3", "$4", "$5", "$6", "$7", "$8", "$9", "$10"];
  // bodyがブロックスコープを含む場合と含まない場合で、return文の扱いを分ける
  const funcBody = body.startsWith("{") ? body : `return ${body}`;
  return new Function(...args, funcBody);
}
