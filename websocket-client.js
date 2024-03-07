const WebSocket = require('ws');

const wsServer = new WebSocket.Server({
  noServer: true,
  verifyClient: (info, next) => {
    // Gelen mesajı düzenleyerek RSV1 bayrağını temizleme
    info.req.rsv1 = false;
    next(true);
  }
});

const server = require('http').createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, HTTP!');
});

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (ws) => {
    wsServer.emit('connection', ws, request);
  });
});

wsServer.on('connection', (socket) => {
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
    socket.send(`Received your message: ${message}`);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
