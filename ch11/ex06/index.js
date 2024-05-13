// 未完成
/**
 *     expect(received).toBe(expected) // Object.is equality

    Expected: true
    Received: false

      41 |         "a@012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901"
      42 |       )
    > 43 |     ).toBe(true);
 * 
 */

/**
 * 与えられた文字列がメールアドレスであるかどうかをチェックする関数
 * @param {string} str - チェックする文字列
 * @returns {boolean} - 文字列がメールアドレスである場合は true、そうでない場合は false
 */
export function isEmailAddress(str) {
  if (typeof str !== "string") {
    return false;
  }

  const [localPart, domain] = str.split("@");

  // ローカル部の長さが64文字を超えている場合はメールアドレスではない
  if (localPart.length > 64) {
    return false;
  }

  // ドメイン部の長さが253文字を超えている場合はメールアドレスではない
  if (domain && domain.length > 253) {
    return false;
  }

  const emailRegex =
    /^[!#$%&'*+\-/=?^_`{|}~0-9A-Za-z]+(\.[!#$%&'*+\-/=?^_`{|}~0-9A-Za-z]+)*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)*$/;
  return emailRegex.test(str);
}
