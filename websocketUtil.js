var express = require("express");
var webSocket = require('ws');

const appPort = 6000;
const app = express();

const websocketPort = 6001;
const websocketServer = new webSocket.Server({ port: websocketPort })


// get access to the body of a post request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// stores all clients that are connected via websockets
clients = [];

// Listener
app.listen(appPort, () => {
    console.log("Server running on port " + appPort);
});

// HTTP methods
app.post("/data", (req, res) => {
    websocketServer.clients.forEach(client => {
        client.send(createMessage(req.body));
    });

    res.sendStatus(200);
});

// Helper functions
function createMessage(message) {
    return JSON.stringify(message);
}