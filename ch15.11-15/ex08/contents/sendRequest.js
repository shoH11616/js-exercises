import WebSocket from "ws";

/**
 * WebSocket サーバに文字列データを含むリクエストメッセージを送信する関数
 * @param {string} requestBody - リクエスト本文
 * @param {number} timeout - タイムアウト時間（ミリ秒）
 * @returns {Promise<string>} - レスポンス本文を含む Promise
 */
export function sendRequest(requestBody, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket("ws://localhost:3003");

    // タイムアウトを設定
    const timer = setTimeout(() => {
      ws.close();
      reject(new Error("タイムアウトしました"));
    }, timeout);

    // WebSocket 接続が開いたときの処理
    ws.on("open", () => {
      ws.send(requestBody);
    });

    // メッセージを受信したときの処理
    ws.on("message", (data) => {
      clearTimeout(timer);
      resolve(data.toString());
      ws.close();
    });

    // エラーが発生したときの処理
    ws.on("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });

    // 接続が切断されたときの処理
    ws.on("close", () => {
      clearTimeout(timer);
      reject(new Error("接続が切断されました"));
    });
  });
}
