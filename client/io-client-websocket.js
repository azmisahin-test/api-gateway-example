// io-client-websocket
require('dotenv').config();
const SERVER_ADDRESS = process.env.SERVER_ADDRESS || "127.0.0.1:5011"
const PROTOCOL = process.env.PROTOCOL || "http"
const serverAddress = `${PROTOCOL}://${SERVER_ADDRESS}`;

console.log("connection...", serverAddress)
const io = require('socket.io-client');

const socket = io(serverAddress, {
    transports: ['websocket'],
});

socket.on('connect', () => {
    console.log('connected with socket.io-client over websocket');

    setInterval(() => {
        var data = '/api/v1/time'
        console.log("sending...", data)
        socket.emit('message', data);
    }, 5000);
});

socket.on('message', (data) => {
    console.log('Received data :', data);
});

socket.on('disconnect', () => {
    console.log('Disconnected.');
});
