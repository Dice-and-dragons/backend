import { Socket } from "socket.io";
import { CharacterDao } from "@/dao/character";
import {
  SocketCharacterEvents,
  SocketServerEvents,
} from "@/schemas/socketEvents";

export class CharacterSocketEvents {
  constructor(private socket: Socket) {
    this.initializeEvents();
  }

  private initializeEvents() {
    this.socket.on(SocketCharacterEvents.Add, this.handleAddCharacter);
    this.socket.on(SocketCharacterEvents.Move, this.handleMoveCharacter);
    this.socket.on(SocketCharacterEvents.Remove, this.handleRemoveCharacter);
    this.socket.on(SocketCharacterEvents.Create, this.handleCreateCharacter);
    this.socket.on(SocketCharacterEvents.Delete, this.handleDeleteCharacter);
    this.socket.on(SocketCharacterEvents.Update, this.handleUpdateCharacter);
  }

  private handleAddCharacter = (data: any) => {
    CharacterDao.addToField(data.id, data.backgroundId, data.position);
    this.socket.broadcast.emit(SocketServerEvents.Update);
  };

  private handleMoveCharacter = (data: any) => {
    CharacterDao.moveToPosition(data.id, data.backgroundId, data.position);
    this.socket.broadcast.emit(SocketServerEvents.Update);
  };

  private handleRemoveCharacter = (data: any) => {
    CharacterDao.removeFromTable(data.id, data.backgroundId);
    this.socket.broadcast.emit(SocketServerEvents.Update);
  };

  private handleCreateCharacter = (data: any) => {
    CharacterDao.createCharacter(data.character, data.userId);
    this.socket.broadcast.emit(SocketServerEvents.Update);
  };

  private handleDeleteCharacter = (data: any) => {
    CharacterDao.deleteCharacter(data.id);
    this.socket.broadcast.emit(SocketServerEvents.Update);
  };

  private handleUpdateCharacter = (data: any) => {
    CharacterDao.updateCharacter(data.id, data.character);
    this.socket.broadcast.emit(SocketServerEvents.Update);
  };
}
