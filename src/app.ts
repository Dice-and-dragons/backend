import http from "http";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { Server } from "socket.io";
import { db } from "@utils/database";
import { characters } from "@schemas/dbSchema";
import { CharacterRouter } from "./routes/character";
import { socketServer } from "@socket/socket";

const app = express();
app.use(cors());

const routes = [new CharacterRouter("/character")];
routes.forEach((route) => {
  app.use(route.path, route.router);
});

// Set up your Express routes, middleware, etc.
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Create HTTP server
const server = http.createServer(app);

// Integrate Socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

socketServer(io);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
