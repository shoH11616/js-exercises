import WebSocket, { WebSocketServer } from "ws";

const port = 3003;
const wss = new WebSocketServer({ port });

console.log(`WebSocket server is running on ws://localhost:${port}`);

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    const message = JSON.parse(data.toString());
    const { requestId, requestBody } = message;
    const responseBody = `Hello, ${requestBody}`;
    const responseMessage = JSON.stringify({ requestId, responseBody });

    console.log(`Received: ${requestBody}, Responding: ${responseBody}`);

    // メッセージを送信したクライアントにレスポンスを返す
    ws.send(responseMessage);
  });
});
