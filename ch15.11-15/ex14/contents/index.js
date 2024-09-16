"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");

button.addEventListener("click", (e) => {
  e.preventDefault();
  getMessageFromServer();
});

async function getMessageFromServer() {
  button.disabled = true; // ボタンを非活性にする

  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  const eventSource = new EventSource("http://localhost:3000/message");

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    messageElement.textContent += data.value;

    if (data.done) {
      eventSource.close();
      button.disabled = false; // 通信が終了したらボタンを再度活性化する
    }
  };

  eventSource.onerror = (error) => {
    console.error("EventSource failed:", error);
    eventSource.close();
    button.disabled = false; // エラーが発生したらボタンを再度活性化する
  };
}
