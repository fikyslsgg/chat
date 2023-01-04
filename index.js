const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/assets'))


io.on('connection', (socket) => {
  socket.on('chat-message', (data) => {
    io.emit('chat-message', {
      message:data.message,
      name:data.name
    });
  });
});

server.listen(3000, () => {
  console.log('Сервер запустился');
});



