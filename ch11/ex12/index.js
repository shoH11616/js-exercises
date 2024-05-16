/**
 * ファイルのサイズが許容サイズを超えている場合に投げられるエラー
 */
class FileSizeError extends Error {
  /**
   * @param {string} message - エラーメッセージ
   */
  constructor(message) {
    super(message); // 親クラスのコンストラクタを呼び出し、エラーメッセージを渡す
    this.name = "FileSizeError"; // エラーの名前をFileSizeErrorに設定
  }
}

/**
 * ファイルのパスを引数に受け取り、ファイルのサイズが許容サイズを超えている場合にエラーを投げる関数
 * @param {string} filePath - ファイルのパス
 * @throws {FileSizeError} - ファイルのサイズが許容サイズを超えている場合
 */
export function checkFileSize(filePath) {
  // Node.jsのファイルシステムモジュールを読み込み
  const fs = require("fs");

  const stats = fs.statSync(filePath); // 同期的にファイルの統計情報を取得
  const fileSizeInBytes = stats["size"]; // ファイルサイズをバイト単位で取得
  const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024); // ファイルサイズをメガバイト単位に変換

  const MAX_FILE_SIZE_MB = 100; // 許容サイズは100MBとする

  // ファイルサイズが許容サイズを超えているかどうかをチェック
  if (fileSizeInMegabytes > MAX_FILE_SIZE_MB) {
    // 許容サイズを超えている場合、FileSizeErrorを投げる
    throw new FileSizeError(
      `File size exceeds the limit of ${MAX_FILE_SIZE_MB}MB.`
    );
  }
}
