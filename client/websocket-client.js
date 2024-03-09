// websocket-client.js
require('dotenv').config();

const SERVER_ADDRESS = process.env.SERVER_ADDRESS || "127.0.0.1"
const HTTP_PORT = process.env.HTTP_PORT || "80"
const HTTPS_PORT = process.env.HTTPS_PORT || "443"
const TCP_PORT = process.env.TCP_PORT || "3000"
const SOCKET_PORT = process.env.SOCKET_PORT || "5000"
const PROTOCOL = process.env.PROTOCOL || "http"
const SOCKET_PROTOCOL = process.env.SOCKET_PROTOCOL || "ws"

const serverAddress = `${SOCKET_PROTOCOL}://${SERVER_ADDRESS}:${SOCKET_PORT}/socket.io/`;

const WebSocket = require("ws");

const options = {
  perMessageDeflate: false,
  rejectUnauthorized: false,  // Self-signed sertifikalara izin vermek için, gerçek bir ortamda bu kullanılmamalıdır.
  headers: {
    'Sec-WebSocket-Protocol': 'wss',
    'Sec-WebSocket-Version': '13',
    'Sec-WebSocket-Extensions': 'permessage-deflate; client_max_window_bits',
  }
};

console.log("connection...", serverAddress)
const socket = new WebSocket(serverAddress);

socket.addEventListener('open', (event) => {
  console.log('Bağlantı başarılı!');

  setInterval(() => {
    var data = '/api/v1/time';
    console.log("Gönderiliyor...", data);
    socket.send(data);
  }, 5000);
});

socket.addEventListener('message', (event) => {
  console.log('Alınan veri:', event.data);
});

socket.addEventListener('close', (event) => {
  console.log('Bağlantı kesildi.');
});

socket.addEventListener('error', (event) => {
  console.error('Hata oluştu:', event);
});
