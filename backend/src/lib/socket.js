import { Server } from "socket.io";
import http from "http";
import express from "express";
import Message from "../models/message.js"; // Assuming you have a Message model defined


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

    socket.on("sendMessage", async (data) => {
    try {
      console.log("📩 Incoming message:", data);

      // Save message to DB
      const newMessage = new Message({
        senderId: data.senderId,
        receiverId: data.receiverId,
        text: data.text,
        image: data.image || null,
      });



      const savedMessage = await newMessage.save();
      console.log("✅ Message saved to DB:", savedMessage);

      // Send to receiver (if online)
      const receiverSocketId = getReceiverSocketId(data.receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("getMessage", savedMessage);
      }
    } catch (err) {
      console.error("❌ Error saving message:", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

  // Handle other socket events here
});

export { io, serverInstance, app };