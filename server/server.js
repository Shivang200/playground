const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const { createServer } = require('http');
const mongoose = require('mongoose');
const userrouter = require('./routes/users');
require('dotenv').config();

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Make sure this is the frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  }
});

// Middlewares
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use('/user', userrouter);

// In-memory room store (just for testing, you can use DB to persist rooms)
const rooms = {};

// Socket.io connection
io.on('connection', (socket) => {
  console.log("Connection established", socket.id);
  
  socket.emit("welcome", socket.id);

  // Listen for room creation request
  socket.on('create-room', () => {
    const roomId = Math.random().toString(36).substring(2, 9); // Generate a random room ID
    rooms[roomId] = []; // Create room in memory
    console.log(`Room created with ID: ${roomId}`);
    socket.emit('room-created', { roomId }); // Send the new room ID to the client
  });

  // Listen for "send" event and emit it to the correct room
  socket.on('send', (data) => {
    const { msg, user, roomId } = data;
    io.to(roomId).emit('recieve', { msg, user, roomId }); // Emit to the specific room
  });

  // Listen for users joining rooms
  socket.on('join-room', (roomId) => {
    if (rooms[roomId]) {
      socket.join(roomId); // Join the room
      console.log(`User ${socket.id} joined room ${roomId}`);
      socket.emit('joined-room', { roomId });
    } else {
      socket.emit('error', { message: 'Room does not exist!' });
    }
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected");
    server.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
