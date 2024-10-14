const net = require("net");
const clients = [];

for (let i = 0; i < 2000; i++) {
  const client = new net.Socket();
  client.connect(8080, "localhost", () => {
    console.log(`Client ${i} connected`);
  });
  client.on("error", (err) => {
    console.error(`Client ${i} error: ${err.message}`);
  });
  clients.push(client);
}

process.on("SIGINT", () => {
  clients.forEach((client, index) => {
    client.destroy();
    console.log(`Client ${index} disconnected`);
  });
  process.exit();
});
