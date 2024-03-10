// http-client.js
require('dotenv').config();

const SERVER_ADDRESS = process.env.SERVER_ADDRESS || "127.0.0.1"
const HTTP_PORT = process.env.HTTP_PORT || "80"
const HTTPS_PORT = process.env.HTTPS_PORT || "443"
const TCP_PORT = process.env.TCP_PORT || "3000"
const SOCKET_PORT = process.env.SOCKET_PORT || "5000"
const PROTOCOL = "https"
const SOCKET_PROTOCOL = process.env.SOCKET_PROTOCOL || "ws"

const serverAddress = `${PROTOCOL}://${SERVER_ADDRESS}:${HTTP_PORT}`;

const axios = require('axios');

// HTTP isteği
const url = `${serverAddress}/api/v1/time`
console.log("HTTP Request", url )
axios.get(url)
  .then(response => {
    console.log('HTTP Response:', response.data);
  })
  .catch(error => {
    console.error('HTTP Error:', error.message);
  });
