/**
 * リトルエンディアンのバイト列として引数のデータを読み込み、ビッグエンディアンのバイト列に変換して返す関数
 * @param {Uint32Array} leArray - リトルエンディアンのバイト列として読み込む Uint32Array
 * @returns {Uint32Array} - ビッグエンディアンのバイト列として変換した Uint32Array
 */
export function leToBe(leArray) {
  // 引数で受け取った Uint32Array のバッファを取得
  const buffer = leArray.buffer;
  // バッファを DataView オブジェクトとしてラップ
  const dv = new DataView(buffer);
  // 変換後のビッグエンディアンの Uint32Array を作成
  const beArray = new Uint32Array(leArray.length);

  // 引数の配列の長さ分だけループ
  for (let i = 0; i < leArray.length; i++) {
    // DataView を使って、リトルエンディアンのデータをビッグエンディアンとして読み出し、
    // 新しい配列にセット
    beArray[i] = dv.getUint32(i * 4, false); // false for big endian
  }

  return beArray;
}

/**
 * ビッグエンディアンのバイト列として引数のデータを読み込み、リトルエンディアンのバイト列に変換して返す関数
 * @param {Uint32Array} beArray - ビッグエンディアンのバイト列として読み込む Uint32Array
 * @returns {Uint32Array} - リトルエンディアンのバイト列として変換した Uint32Array
 */
export function beToLe(beArray) {
  // 引数で受け取った Uint32Array のバッファを取得
  const buffer = beArray.buffer;
  // バッファを DataView オブジェクトとしてラップ
  const dv = new DataView(buffer);
  // 変換後のリトルエンディアンの Uint32Array を作成
  const leArray = new Uint32Array(beArray.length);

  // 引数の配列の長さ分だけループ
  for (let i = 0; i < beArray.length; i++) {
    // DataView を使って、ビッグエンディアンのデータを読み出し
    const value = dv.getUint32(i * 4, false); // false for big endian
    // 読み出した値をリトルエンディアンとして DataView にセット
    dv.setUint32(i * 4, value, true); // true for little endian
    // 変換した値を新しい配列にセット
    leArray[i] = dv.getUint32(i * 4, true); // true for little endian
  }

  return leArray;
}
