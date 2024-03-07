const WebSocket = require('ws');

// WebSocket bağlantısı
const socket = new WebSocket('ws://localhost:3000/api/v1/time');

// Bağlantı başarılı olduğunda
socket.on('open', () => {
  console.log('WebSocket connection opened');
  
  // Mesaj gönderme
  const message = JSON.stringify({ text: 'Hello, WebSocket!' });
  socket.send(message);
});

// Mesaj alındığında
socket.on('message', (message) => {
  console.log('WebSocket Response:', message.toString());

  // Bağlantıyı kapatma
  socket.close();
});

// Hata yakalama
socket.on('error', (error) => {
  console.error('WebSocket Error:', error.message);
});
