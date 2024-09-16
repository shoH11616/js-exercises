// sendRequest 関数の実装
async function sendRequest(message) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket("ws://localhost:3003");
    const timeout = 5000; // タイムアウト時間（ミリ秒）
    let isResolved = false;

    ws.onopen = () => {
      ws.send(JSON.stringify({ id: Date.now(), message }));
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.id === message.id && !isResolved) {
        isResolved = true;
        resolve(response.message);
        ws.close();
      }
    };

    ws.onerror = (error) => {
      if (!isResolved) {
        isResolved = true;
        reject(error);
        ws.close();
      }
    };

    ws.onclose = () => {
      if (!isResolved) {
        isResolved = true;
        reject(new Error("WebSocket connection closed"));
      }
    };

    setTimeout(() => {
      if (!isResolved) {
        isResolved = true;
        reject(new Error("Request timed out"));
        ws.close();
      }
    }, timeout);
  });
}

// WebSocketサーバから転送されたリクエストメッセージを受信してレスポンスを返す実装
const ws = new WebSocket("ws://localhost:3003");

ws.onmessage = (event) => {
  const request = JSON.parse(event.data);
  const response = { id: request.id, message: `Hello, ${request.message}` };
  ws.send(JSON.stringify(response));
};
