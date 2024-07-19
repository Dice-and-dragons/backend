import http from "http";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { Server } from "socket.io";
import {db} from "@utils/database"
import { characters } from "./schemas/dbSchema";

const app = express();
app.use(cors());

// Set up your Express routes, middleware, etc.
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Create HTTP server
const server = http.createServer(app);

// Integrate Socket.io
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

// WebSocket connection handler
io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  // Listen for 'ping' event from the client
  socket.on('ping', () => {
    console.log('Ping received from:', socket.id);
    
    // Emit 'ping' event to all other connected clients
    socket.broadcast.emit('ping');
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
    console.log(db.select().from(characters) || 'asfsa')
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
