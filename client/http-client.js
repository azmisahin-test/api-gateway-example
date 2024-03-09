// http-client.js
require('dotenv').config();
const SERVER_ADDRESS = process.env.SERVER_ADDRESS || "127.0.0.1:5011"
const PROTOCOL = process.env.PROTOCOL || "http"
const serverAddress = `${PROTOCOL}://${SERVER_ADDRESS}`;
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
