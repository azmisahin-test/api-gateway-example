
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
    transports: ['websocket'],
});

socket.on('connect', () => {

    console.log('connected with web socket.io-client');


    socket.on("home", (data) => {
        console.log('home', data);
    });

    socket.on("/api/v1/time", (data) => {
        console.log('response:/api/v1/time', data);
    });


    // test
    setInterval(() => {
        var endpoint = '/api/v1/time'
        console.log("get:/api/v1/time", endpoint)
        socket.emit("get", endpoint);
    }, 5000);


    socket.on("simulation_status", (data) => {
        console.log('simulation_status', data);
    });

    socket.on("simulation_sampler_status", (data) => {
        console.log('simulation_sampler_status', data);
    });

    socket.on("simulation_instance_status", (data) => {
        console.log('simulation_instance_status', data);
    });

});

socket.on('message', (data) => {
    console.log('message', data);
})

socket.on('error', (data) => {
    console.log('error', data);
})

socket.on('close', (data) => {
    console.log('close', data);
})

socket.on('disconnect', (data) => {
    console.log('disconnect', data);
})
