async function sendMessage() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const message = input.value;
  input.value = "";

  const userMessage = document.createElement("div");
  userMessage.textContent = `You: ${message}`;
  chat.appendChild(userMessage);

  const response = await fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: message }),
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let aiMessage = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    aiMessage += decoder.decode(value);
    const aiMessageDiv = document.createElement("div");
    aiMessageDiv.textContent = `AI: ${aiMessage}`;
    chat.appendChild(aiMessageDiv);
  }
}
