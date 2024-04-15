/**
 * `instanceof`と等価な関数。
 * @param {object} object インスタンス
 * @param {function} constructor コンストラクタ
 * @returns {boolean} objectがconstructorのインスタンスであればtrue、そうでなければfalse
 */
export function instanceOf(object, constructor) {
  let proto = Object.getPrototypeOf(object);

  while (proto) {
    if (proto === constructor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}
