import { Server, Socket } from "socket.io";
import { CharacterDao } from "@/dao/character";
import {
  SocketCharacterEvents,
  SocketServerEvents,
} from "@/schemas/socketEvents";
import { CharacterSocketEvents } from "@/socket/characters";

export const socketServer = (io: Server) => {
  io.on(SocketServerEvents.Connection, (socket) => {
    console.log("a user connected:", socket.id);
    socket.on("ping", (data) => {
      console.log("Ping received from:", socket.id, "with data:", data);
      socket.broadcast.emit("ping");
    });

    new CharacterSocketEvents(socket);

    socket.on(SocketServerEvents.Disconnect, () => {
      console.log("Disconnect");
    });
  });
};
