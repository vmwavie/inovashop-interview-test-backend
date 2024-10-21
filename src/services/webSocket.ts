import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server;
const userSockets: Map<number, Set<string>> = new Map();

function initializeSocketIO(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", socket => {
    const userId = socket.handshake.auth.userId;
    if (userId) {
      if (!userSockets.has(userId)) {
        userSockets.set(userId, new Set());
      }
      userSockets.get(userId)!.add(socket.id);

      socket.on("disconnect", () => {
        userSockets.get(userId)?.delete(socket.id);
        if (userSockets.get(userId)?.size === 0) {
          userSockets.delete(userId);
        }
      });
    }
  });
}

function emitToUserDevices(userId: number, event: string, data: any) {
  const socketIds = userSockets.get(userId);
  if (socketIds) {
    socketIds.forEach(socketId => {
      io.to(socketId).emit(event, data);
    });
  }
}

export { initializeSocketIO, emitToUserDevices };
