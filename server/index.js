const http = require("http");

let clients = [];

const server = http.createServer((req, res) => {
  if (req.url === "/stream") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Access-Control-Allow-Origin": "http://localhost:3001",
    });
    const client = { id: Date.now(), res };
    clients.push(client);
    req.on("close", () => {
      clients = clients.filter((c) => c.id !== client.id);
    });
  }
  if (req.url === "/send") {
    clients?.forEach((client) => {
      const randomNumber = Math.random().toFixed(2);
      client.res.write("event: notification\n");
      client.res.write(`data: ${randomNumber}\n\n`);

      client.res.write(`data: hello\n\n`);
    });
    res.end();
  }
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
