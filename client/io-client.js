// io-client.js
require('dotenv').config();

const SERVER_ADDRESS = process.env.SERVER_ADDRESS || "127.0.0.1"
const HTTP_PORT = process.env.HTTP_PORT || "8080"
const HTTPS_PORT = process.env.HTTPS_PORT || "8080"
const TCP_PORT = process.env.TCP_PORT || "8080"
const SOCKET_PORT = process.env.SOCKET_PORT || "8080"
const PROTOCOL = process.env.PROTOCOL || "http"
const SOCKET_PROTOCOL = process.env.SOCKET_PROTOCOL || "ws"

const serverAddress = `${PROTOCOL}://${SERVER_ADDRESS}:${SOCKET_PORT}`;

const io = require('socket.io-client');

console.log("connection...", serverAddress)
const socket = io(serverAddress, {

});

socket.on('connect', () => {

    console.log('connected with socket.io-client');

    socket.on("simulation_started", (data) => {
        console.log('Received Data :', data);
    });

});


socket.on("simulation_started", (data) => {
    console.log('Received Data :', data);
});