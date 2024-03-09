// http-client.js
const express = require('express');
const http = require('http');
const httpProxy = require('http-proxy');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const proxy = httpProxy.createProxyServer({});

const wsServer = new WebSocket.Server({ server });

// HTTP/HTTPS endpoint
app.get('/api/v1/time', (req, res) => {
  res.json({ time: new Date() });
});

// WebSocket endpoint
wsServer.on('connection', (socket) => {
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
    socket.send(`Received your message: ${message}`);
  });
});

// Proxy WebSocket connections
server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head, { target: 'ws://localhost:3000' });
});

// Proxy HTTP requests
app.all('/api/*', (req, res) => {
  proxy.web(req, res, { target: 'http://localhost:3000' });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
