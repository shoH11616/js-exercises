const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const cellSize = 10;
const rows = canvas.height / cellSize;
const cols = canvas.width / cellSize;

let grid = [];
let paused = true;

const ws = new WebSocket("ws://localhost:3003");

ws.onopen = () => {
  console.log("Connected to WebSocket server");
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  switch (message.type) {
    case "update":
      grid = message.grid;
      drawGrid();
      break;
    case "pause":
      paused = true;
      break;
    case "start":
      paused = false;
      break;
  }
};

ws.onclose = () => {
  console.log("Disconnected from WebSocket server");
};

document.getElementById("startButton").addEventListener("click", () => {
  ws.send(JSON.stringify({ type: "start" }));
  playSound();
});

document.getElementById("pauseButton").addEventListener("click", () => {
  ws.send(JSON.stringify({ type: "pause" }));
  playSound();
});

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const row = Math.floor(y / cellSize);
  const col = Math.floor(x / cellSize);
  ws.send(JSON.stringify({ type: "toggle", row, col }));
  playSound();
});

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      ctx.beginPath();
      ctx.rect(col * cellSize, row * cellSize, cellSize, cellSize);
      ctx.fillStyle = grid[row][col] ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}

function playSound() {
  const sound = document.getElementById("decisionSound");
  sound.play();
}
