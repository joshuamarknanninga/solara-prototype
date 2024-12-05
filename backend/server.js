// backend/server.js

const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

// Enable CORS for all origins (adjust as needed for production)
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Define Routes
const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "DELETE"]
  }
});

// Socket.io Connection
io.on('connection', (socket) => {
  console.log('New client connected');

  // Example: Emit updates when a process is created or terminated
  // In a real application, you'd have event emitters in your controllers or systemCalls

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
