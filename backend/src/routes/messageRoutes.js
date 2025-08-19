import express from "express";
import { protectedRoute } from "../middleware/authMiddleware.js";
import { getUserForSidebar } from "../controllers/messageController.js";
import { getMessages, sendMessages } from "../controllers/messageController.js";


const router = express.Router();

router.get("/user", protectedRoute, getUserForSidebar);
router.get("/:id", protectedRoute, getMessages)
router.post("/send/:id", protectedRoute, sendMessages)

export default router;
