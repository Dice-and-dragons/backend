import { Server, Socket } from "socket.io";
import { CharacterDao } from "@/dao/character";
import { SocketCharacterEvents, SocketServerEvents } from "@/schemas/socket";

export const socketServer = (io: Server) => {
  io.on(SocketServerEvents.Connection, (socket) => {
    console.log("a user connected:", socket.id);
    socket.on("ping", (data) => {
      console.log("Ping received from:", socket.id, "with data:", data);
      socket.broadcast.emit("ping");
    });

    socket.on(SocketCharacterEvents.Add, (data) => {
      CharacterDao.addToField(data.id, data.backgroundId, data.position);
      socket.broadcast.emit(SocketServerEvents.Update);
    });

    socket.on(SocketCharacterEvents.Move, (data) => {
      CharacterDao.moveToPosition(data.id, data.backgroundId, data.position);
      socket.broadcast.emit(SocketServerEvents.Update);
    });

    socket.on(SocketCharacterEvents.Remove, (data) => {
      CharacterDao.removeFromTable(data.id, data.backgroundId);
      socket.broadcast.emit(SocketServerEvents.Update);
    });

    socket.on(SocketServerEvents.Disconnect, () => {
      console.log("Disconnect");
    });
  });
};
