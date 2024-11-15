const net = require("net");
const clients = [];

// 2000個のクライアントソケットを作成して接続する
for (let i = 0; i < 20000; i++) {
  const client = new net.Socket();
  client.connect(8080, "localhost", () => {
    console.log(`Client ${i} connected`); // クライアントが接続されたことを表示
  });

  // エラーが発生した場合の処理
  client.on("error", (err) => {
    console.error(`Client ${i} error: ${err.message}`); // エラーメッセージを表示
  });

  clients.push(client); // クライアントソケットをリストに追加
}

// プロセスがSIGINT（Ctrl+C）を受け取ったときの処理
process.on("SIGINT", () => {
  clients.forEach((client, index) => {
    client.destroy(); // クライアントソケットを破棄
    console.log(`Client ${index} disconnected`); // クライアントが切断されたことを表示
  });
  process.exit(); // プロセスを終了
});
