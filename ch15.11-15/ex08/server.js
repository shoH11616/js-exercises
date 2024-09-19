import WebSocket, { WebSocketServer } from "ws"; // WebSocketとWebSocketServerをwsモジュールからインポート

const port = 3003; // サーバーがリッスンするポート番号
const wss = new WebSocketServer({ port }); // 指定したポートでWebSocketサーバーを作成

/**
 * 他のクライアントにメッセージを転送する
 * @param {WebSocket} ws - 接続されたWebSocketクライアント
 */
wss.on("connection", (ws) => {
  // クライアントからメッセージを受信したときの処理
  ws.on("message", (data) => {
    const message = data.toString(); // 受信したデータを文字列に変換
    const waitTime = Math.floor(Math.random() * 1000 * 5); // 0から5000ミリ秒のランダムな待機時間を生成
    console.log(message, `wait ${waitTime}ms`); // メッセージと待機時間をコンソールに出力

    // 接続されている全てのクライアントにメッセージを送信
    wss.clients.forEach((client) => {
      // メッセージを送信したクライアント自身には送信しない
      if (client.readyState === WebSocket.OPEN && client !== ws) {
        setTimeout(() => {
          client.send(message); // ランダムな待機時間後にメッセージを送信
        }, waitTime);
      }
    });
  });
});
