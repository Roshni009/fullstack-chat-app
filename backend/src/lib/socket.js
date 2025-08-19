import { Server } from "socket.io";
import http from "http";
import express from "express";


const app = express();
const serverInstance = http.createServer(app);

const io = new Server(serverInstance, {
  cors: { 
    origin: "http://localhost:5173",
  },
  
});

export function getReceiverSocketId(userId) {
  // This function can be used to get the socket ID of a user by their userId
  return userSocketMap[userId];

}
// used to store online users
const userSocketMap = {}; // maps userId to socketId


io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  const userId = socket.handshake.query.userId; // assuming userId is sent in the query params
  if(userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));


  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

  // Handle other socket events here
});

export { io, serverInstance, app };