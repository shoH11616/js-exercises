/**
 * 与えられたバイト列に対し、そのバイナリデータのファイル種別を返す関数
 * @param {ArrayBuffer} buffer - ファイル種別を推測するためのバイト列
 * @returns {string} - 推測されたファイル種別
 */
export function detectFileType(buffer) {
  const dataView = new DataView(buffer);
  const byte1 = dataView.getUint8(0);
  const byte2 = dataView.getUint8(1);
  const byte3 = dataView.getUint8(2);
  const byte4 = dataView.getUint8(3);
  const byte5 = buffer.byteLength > 4 ? dataView.getUint8(4) : null;

  if (
    byte1 === 0x25 &&
    byte2 === 0x50 &&
    byte3 === 0x44 &&
    byte4 === 0x46 &&
    byte5 === 0x2d
  ) {
    return "PDF";
  } else if (
    byte1 === 0x50 &&
    byte2 === 0x4b &&
    (byte3 === 0x03 || byte3 === 0x05 || byte3 === 0x07)
  ) {
    return "ZIP";
  } else if (
    byte1 === 0x47 &&
    byte2 === 0x49 &&
    byte3 === 0x46 &&
    byte4 === 0x38 &&
    (byte5 === 0x37 || byte5 === 0x39)
  ) {
    return "GIF";
  } else if (
    byte1 === 0x89 &&
    byte2 === 0x50 &&
    byte3 === 0x4e &&
    byte4 === 0x47
  ) {
    return "PNG";
  } else {
    return "UNKNOWN";
  }
}
