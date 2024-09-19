/**
 * WebSocket サーバに文字列データを含むリクエストメッセージを送信する関数
 * @param {string} requestBody - リクエスト本文
 * @param {number} timeout - タイムアウト時間（ミリ秒）
 * @returns {Promise<string>} - レスポンス本文を含む Promise
 */
function sendRequest(requestBody, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket("ws://localhost:3003");
    const requestId = Date.now(); // リクエストIDとして現在のタイムスタンプを使用

    // タイムアウトを設定
    const timer = setTimeout(() => {
      ws.close();
      reject(new Error("タイムアウトしました"));
    }, timeout);

    // WebSocket 接続が開いたときの処理
    ws.onopen = () => {
      const message = JSON.stringify({ requestId, requestBody });
      ws.send(message);
    };

    // メッセージを受信したときの処理
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.requestId === requestId) {
        clearTimeout(timer);
        resolve(response.responseBody);
        ws.close();
      }
    };

    // エラーが発生したときの処理
    ws.onerror = (err) => {
      clearTimeout(timer);
      reject(err);
    };

    // 接続が切断されたときの処理
    ws.onclose = () => {
      clearTimeout(timer);
      reject(new Error("接続が切断されました"));
    };
  });
}

document.getElementById("sendButton").addEventListener("click", async () => {
  try {
    const response = await sendRequest("Hello, WebSocket!");
    document.getElementById("response").innerText = `Response: ${response}`;
  } catch (error) {
    document.getElementById("response").innerText = `Error: ${error.message}`;
  }
});