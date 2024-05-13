/**
 * リトルエンディアンのバイト列として引数のデータを読み込み、ビッグエンディアンのバイト列に変換して返す関数
 * @param {Uint32Array} leArray - リトルエンディアンのバイト列として読み込む Uint32Array
 * @returns {Uint32Array} - ビッグエンディアンのバイト列として変換した Uint32Array
 */
export function leToBe(leArray) {
  const buffer = leArray.buffer;
  const dv = new DataView(buffer);
  const beArray = new Uint32Array(leArray.length);

  for (let i = 0; i < leArray.length; i++) {
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
  const buffer = beArray.buffer;
  const dv = new DataView(buffer);
  const leArray = new Uint32Array(beArray.length);

  for (let i = 0; i < beArray.length; i++) {
    const value = dv.getUint32(i * 4, false); // false for big endian
    dv.setUint32(i * 4, value, true); // true for little endian
    leArray[i] = dv.getUint32(i * 4, true); // true for little endian
  }

  return leArray;
}
