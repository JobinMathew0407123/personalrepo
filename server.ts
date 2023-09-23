// src/server.ts

import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { errorHandler } from './middleware/errorHandler';
const schema = require('./graphql/schema');
 // Import your error handler middleware\
 const http = require('http');


const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Set up event handling when a client connects
io.on('connection', (socket) => {
  console.log('A client has connected.');

  // Handle events from the client
  socket.on('chat message', (msg) => {
    console.log('Received message:', msg);
    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A client has disconnected.');
  });
});

io.on('connection', (socket:any) => {
    console.log('A client has connected.');
  
    // Join a room
    socket.join('roomName'); // You can replace 'roomName' with your room identifier
  
    // Handle events from the client in the room
    socket.on('room message', (msg:any) => {
      // Broadcast the message to all clients in the room
      io.to('roomName').emit('room message', msg);
    });
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A client has disconnected.');
    });
  });
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
  graphiql: true,
  })
);
app.use(errorHandler); // Add the error handler middleware

app.listen(4000, () => {
  console.log('Server started on http://localhost:4000/graphql');
});
