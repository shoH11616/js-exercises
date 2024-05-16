/**
 * 与えられたバイト列に対し、そのバイナリデータのファイル種別を返す関数
 * @param {ArrayBuffer} buffer - ファイル種別を推測するためのバイト列
 * @returns {string} - 推測されたファイル種別
 */
export function detectFileType(buffer) {
  // 引数として受け取った ArrayBuffer を DataView に変換して、バイト単位での読み取りを可能に
  const dataView = new DataView(buffer);
  // 最初の4バイトと、必要に応じて5バイト目を取得
  const byte1 = dataView.getUint8(0);
  const byte2 = dataView.getUint8(1);
  const byte3 = dataView.getUint8(2);
  const byte4 = dataView.getUint8(3);
  // バイト列が5バイト以上ある場合に限り、5バイト目を取得
  const byte5 = buffer.byteLength > 4 ? dataView.getUint8(4) : null;

  if (
    // PDFファイルのシグネチャ（%PDF-）に一致するかを確認
    byte1 === 0x25 &&
    byte2 === 0x50 &&
    byte3 === 0x44 &&
    byte4 === 0x46 &&
    byte5 === 0x2d
  ) {
    return "PDF";
  } else if (
    // ZIPファイルのシグネチャ（PK）に一致するかを確認
    byte1 === 0x50 &&
    byte2 === 0x4b &&
    (byte3 === 0x03 || byte3 === 0x05 || byte3 === 0x07)
  ) {
    return "ZIP";
  } else if (
    // GIFファイルのシグネチャ（GIF87aまたはGIF89a）に一致するかを確認
    byte1 === 0x47 &&
    byte2 === 0x49 &&
    byte3 === 0x46 &&
    byte4 === 0x38 &&
    (byte5 === 0x37 || byte5 === 0x39)
  ) {
    return "GIF";
  } else if (
    // PNGファイルのシグネチャに一致するかを確認
    byte1 === 0x89 &&
    byte2 === 0x50 &&
    byte3 === 0x4e &&
    byte4 === 0x47
  ) {
    return "PNG";
  } else {
    // 上記のいずれにも該当しない場合
    return "UNKNOWN";
  }
}
