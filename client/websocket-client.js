// websocket-client.js
require('dotenv').config();

const SERVER_ADDRESS = process.env.SERVER_ADDRESS || "127.0.0.1"
const HTTP_PORT = process.env.HTTP_PORT || "8080"
const HTTPS_PORT = process.env.HTTPS_PORT || "8080"
const TCP_PORT = process.env.TCP_PORT || "8080"
const SOCKET_PORT = process.env.SOCKET_PORT || "8080"
const PROTOCOL = process.env.PROTOCOL || "http"
const SOCKET_PROTOCOL = process.env.SOCKET_PROTOCOL || "ws"

const serverAddress = `${SOCKET_PROTOCOL}://${SERVER_ADDRESS}:${SOCKET_PORT}/socket.io/`;

const WebSocket = require("ws");

const options = {
  perMessageDeflate: false,
  rejectUnauthorized: false,  // Self-signed 
  headers: {
    'Sec-WebSocket-Protocol': 'ws',
    'Sec-WebSocket-Version': '13',
    'Sec-WebSocket-Extensions': 'permessage-deflate; client_max_window_bits',
  }
};

console.log("connection...", serverAddress)
const socket = new WebSocket(serverAddress, options);

socket.addEventListener('open', (event) => {
  console.log('connected with WebSocket');

  setInterval(() => {
    var endpoint = '/api/v1/time'
    console.log("sending...", endpoint)
    socket.emit("get", endpoint);
  }, 5000);

});

socket.addEventListener('/api/v1/time', (event) => {
  console.log('Received Data :', event.data);
});

socket.addEventListener('message', (event) => {
  console.log('Received Message :', event.data);
});

socket.addEventListener('close', (event) => {
  console.log('Disconnected.');
});

socket.addEventListener('error', (event) => {
  console.error('Error :', event);
});
