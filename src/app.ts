import http from "http";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { Server } from "socket.io";
import { CharacterRouter } from "./routes/character";
import { socketServer } from "@socket/socket";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = [new CharacterRouter("/character")];
routes.forEach((route) => {
  app.use(route.path, route.router);
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

socketServer(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(process.env.DB)
});
