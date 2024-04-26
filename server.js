const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws) {
  console.log("New Client Connection");

  ws.on("message", function incoming(message) {
    console.log(message);
    // Broadcast the message to all clients
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

server.listen(5000, function listening() {
  console.log("Listening on %d", server.address().port);
});
