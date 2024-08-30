import { Socket } from "socket.io";
import { BackgroundDao } from "@/dao/background";
import {
  SocketBackgroundEvents,
  SocketServerEvents,
} from "@/schemas/socketEvents";

export class BackgroundsSocketEvents {
  constructor(private socket: Socket) {
    this.initializeEvents();
  }

  private initializeEvents() {
    
  }

 
}
