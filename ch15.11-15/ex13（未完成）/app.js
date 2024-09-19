document.getElementById("send-button").addEventListener("click", async () => {
  const userInput = document.getElementById("user-input").value;
  if (!userInput) return;

  const chatBox = document.getElementById("chat-box");
  const userMessage = document.createElement("div");
  userMessage.textContent = `You: ${userInput}`;
  chatBox.appendChild(userMessage);

  const responseMessage = document.createElement("div");
  responseMessage.textContent = "LLM: ";
  chatBox.appendChild(responseMessage);

  const response = await fetch("http://localhost:11400/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gemma2:2b",
      prompt: userInput,
      stream: true,
    }),
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunk = decoder.decode(value, { stream: true });
    responseMessage.textContent += chunk;
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  document.getElementById("user-input").value = "";
});
