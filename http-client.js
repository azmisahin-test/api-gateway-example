const axios = require('axios');

// HTTP isteği
axios.get('http://localhost:3000/api/v1/time')
  .then(response => {
    console.log('HTTP Response:', response.data);
  })
  .catch(error => {
    console.error('HTTP Error:', error.message);
  });
