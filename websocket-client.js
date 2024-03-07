const WebSocket = require('ws');

// WebSocket bağlantısı
const socket = new WebSocket('ws://localhost:3000/api/v1/time');

// Bağlantı başarılı olduğunda
socket.on('open', () => {
  console.log('WebSocket connection opened');
  
  // Mesaj gönderme
  socket.send('Hello, WebSocket!');
});

// Mesaj alındığında
socket.on('message', (message) => {
  console.log('WebSocket Response:', message);

  // Bağlantıyı kapatma
  socket.close();
});
