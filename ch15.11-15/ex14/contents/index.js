"use strict";

// 送信ボタンの要素を取得
const button = document.querySelector("#send-button");
// メッセージコンテナの要素を取得
const messageContainer = document.getElementById("message-container");

// 送信ボタンにクリックイベントリスナーを追加
button.addEventListener("click", (e) => {
  e.preventDefault(); // デフォルトの送信動作を防止
  getMessageFromServer(); // サーバーからメッセージを取得する関数を呼び出す
});

/**
 * サーバーからメッセージを取得する非同期関数
 * ボタンを非活性にし、新しいメッセージ要素を作成してメッセージコンテナに追加する
 * EventSourceを使用してサーバーからのメッセージを逐次受信し、メッセージ要素に追加する
 */
async function getMessageFromServer() {
  button.disabled = true; // ボタンを非活性にする

  // 新しいメッセージ要素を作成
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  // EventSourceを使用してサーバーからメッセージを受信
  const eventSource = new EventSource("http://localhost:3000/message");

  // サーバーからメッセージを受信したときの処理
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data); // 受信したデータをJSON形式にパース
    messageElement.textContent += data.value; // メッセージ要素にデータを追加

    // 受信が完了した場合の処理
    if (data.done) {
      eventSource.close(); // EventSourceを閉じる
      button.disabled = false; // ボタンを再度活性化する
    }
  };

  // エラーが発生したときの処理
  eventSource.onerror = (error) => {
    console.error("EventSource failed:", error); // エラーメッセージをコンソールに表示
    eventSource.close(); // EventSourceを閉じる
    button.disabled = false; // ボタンを再度活性化する
  };
}
