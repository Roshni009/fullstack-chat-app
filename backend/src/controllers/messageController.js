import User from "../models/user.js";
import Message from "../models/message.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

// ✅ Get all users except logged-in user
export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error fetching user for sidebar:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get all messages between two users
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 }); // ✅ sorted by time

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Send a message
export const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

       console.log("📩 Incoming message request:");
    console.log("SenderId:", senderId);
    console.log("ReceiverId:", receiverId);
    console.log("Text:", text);
    console.log("Image (base64?):", image ? "✅ Provided" : "❌ Not provided");


    // ✅ Validate
    if (!text && !image) {
      return res.status(400).json({ message: "Message cannot be empty" });
    }

    // ✅ Upload image if provided
    let imageUrl = null;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "chat_images",
      });
      imageUrl = uploadResponse.secure_url;
    }

    // ✅ Save message
    const newMessage = new Message({
      senderId,
      receiverId,
      text: text || "", // fallback
      image: imageUrl,
    });

     const savedMessage = await newMessage.save();
    console.log("✅ Message saved to DB:", savedMessage);

    // ✅ Emit real-time event to receiver if online
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", savedMessage);
    }

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Error sending message:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
