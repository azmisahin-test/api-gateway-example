
require('dotenv').config();

const SERVER_ADDRESS = process.env.SERVER_ADDRESS || "127.0.0.1"
const HTTP_PORT = process.env.HTTP_PORT || "80"
const HTTPS_PORT = process.env.HTTPS_PORT || "443"
const TCP_PORT = process.env.TCP_PORT || "3000"
const SOCKET_PORT = process.env.SOCKET_PORT || "5000"
const PROTOCOL = process.env.PROTOCOL || "http"
const SOCKET_PROTOCOL = process.env.SOCKET_PROTOCOL || "ws"

const serverAddress = `${PROTOCOL}://${SERVER_ADDRESS}:${SOCKET_PORT}`;

const io = require('socket.io-client');

console.log("connection...", serverAddress)
const socket = io(serverAddress, {
    transports: ['websocket'],
});

socket.on('connect', () => {
    console.log('connected with socket.io-client');


    setInterval(() => {
        var endpoint = '/api/v1/time'
        console.log("sending...", endpoint)
        socket.emit("get", endpoint);
    }, 5000);
});

socket.on('/api/v1/time', (data) => {
    console.log('Received data :', data);
});

socket.on('disconnect', () => {
    console.log('Disconnected.');
});
