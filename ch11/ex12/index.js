/**
 * ファイルのサイズが許容サイズを超えている場合に投げられるエラー
 */
class FileSizeError extends Error {
  /**
   * @param {string} message - エラーメッセージ
   */
  constructor(message) {
    super(message);
    this.name = "FileSizeError";
  }
}

/**
 * ファイルのパスを引数に受け取り、ファイルのサイズが許容サイズを超えている場合にエラーを投げる関数
 * @param {string} filePath - ファイルのパス
 * @throws {FileSizeError} - ファイルのサイズが許容サイズを超えている場合
 */
export function checkFileSize(filePath) {
  const fs = require("fs");

  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats["size"];
  const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

  const MAX_FILE_SIZE_MB = 100; // 許容サイズは100MBとする

  if (fileSizeInMegabytes > MAX_FILE_SIZE_MB) {
    throw new FileSizeError(
      `File size exceeds the limit of ${MAX_FILE_SIZE_MB}MB.`
    );
  }
}
