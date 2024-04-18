/**
 * 関数にmyCallプロパティを追加する関数。
 * @param {Function} f - myCallプロパティを追加する対象の関数
 */
export function addMyCall(f) {
  // f関数にmyCall関数プロパティを追加。thisArgという引数と、そのあとに続く任意の数の引数をうけとる
  f.myCall = function (thisArg, ...args) {
    // this.bind(thisArg)によりあらたな関数を作成、その関数を(...args)で呼び出している。
    // thisはfを指し、bindメソッドはthisの値をthisArgに設定した新しい関数を作成。
    // その関数を(...args)でよびだし、その結果を返す。
    // 要するに、thisの値を明示した状態で関数を使える。
    return this.bind(thisArg)(...args);
  };
}
