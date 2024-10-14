document.getElementById("send-button").addEventListener("click", async () => {
  const userInput = document.getElementById("user-input").value;
  if (!userInput) return;

  const chatBox = document.getElementById("chat-box");
  const userMessage = document.createElement("div");
  userMessage.className = "message user-message";
  userMessage.textContent = userInput;
  chatBox.appendChild(userMessage);

  const responseMessage = document.createElement("div");
  responseMessage.className = "message bot-message";
  responseMessage.textContent = "LLM: ";
  chatBox.appendChild(responseMessage);

  const response = await fetch("http://localhost:11434/v1/completions", {
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

    // JSONデータを解析してテキスト部分を抽出
    const lines = chunk.split("\n");
    for (const line of lines) {
      if (line.trim() !== "") {
        const json = JSON.parse(line.replace(/^data: /, ""));
        if (json.choices && json.choices[0] && json.choices[0].text) {
          responseMessage.textContent += json.choices[0].text;
        }
      }
    }

    chatBox.scrollTop = chatBox.scrollHeight;
  }

  document.getElementById("user-input").value = "";
});
