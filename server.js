const express = require("express");
const app = express();

const http = require("http");

const server = http.createServer(app);

app.use(express.static("src"));

const WebSocket = require("ws");

const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {

    ws.on("message", message => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
    ws.send("something");
});

server.listen(process.env.PORT || 8080, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
