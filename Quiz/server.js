const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const sessions = {}; // Store the quiz sessions and user responses

io.on('connection', (socket) => {
  socket.on('join', (sessionId) => {
    socket.join(sessionId);
    if (!sessions[sessionId]) {
      sessions[sessionId] = {
        responses: {},
      };
    }
    socket.emit('questions', { sessionId, questions: [] }); // Send questions to the user
  });

  socket.on('submit', (data) => {
    const { sessionId, userId, answers } = data;
    const session = sessions[sessionId];
    session.responses[userId] = answers;

    const results = {}; // Aggregate the results here
    io.to(sessionId).emit('results', results); // Broadcast the results to all users
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
