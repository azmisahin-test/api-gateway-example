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

socket.addEventListener('open', (data) => {

  console.log('connected with WebSocket');

  socket.addEventListener('connect', () => {

    console.log('connected with web socket.io-client');


    socket.addEventListener("home", (data) => {
      console.log('home', data);
    });

    socket.addEventListener("/api/v1/time", (data) => {
      console.log('response:/api/v1/time', data);
    });


    // test
    setInterval(() => {
      var endpoint = '/api/v1/time'
      console.log("get:/api/v1/time", endpoint)
      socket.emit("get", endpoint);
    }, 5000);


    socket.addEventListener("simulation_status", (data) => {
      console.log('simulation_status', data);
    });

    socket.addEventListener("simulation_sampler_status", (data) => {
      console.log('simulation_sampler_status', data);
    });

    socket.addEventListener("simulation_instance_status", (data) => {
      console.log('simulation_instance_status', data);
    });

  });

  socket.addEventListener('message', (data) => {
    console.log('message', data);
  })

  socket.addEventListener('error', (data) => {
    console.log('error', data);
  })

  socket.addEventListener('close', (data) => {
    console.log('close', data);
  })

  socket.addEventListener('disconnect', (data) => {
    console.log('disconnect', data);
  })
});
