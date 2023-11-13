const express = require("express");
const router = express.Router();
const middleware = require("./middleware");
const ChatMessage = require("./chatMessageModel");

// Apply authentication middleware to the chat routes
router.use(middleware);

// Example chat route to save a message
router.post("/sendMessage", async (req, res) => {
    try {
        const userId = req.user.id; // User ID from the authentication middleware
        const { message } = req.body;

        // Save the chat message with the associated user ID
        const newMessage = new ChatMessage({
            user: userId,
            message,
        });

        await newMessage.save();

        res.status(200).json({ message: "Message sent successfully", isSender: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

// Example chat route to get all messages
router.get("/getMessages", async (req, res) => {
    try {
        const userId = req.user.id; // User ID from the authentication middleware

        // Retrieve all messages and populate the associated user details
        const messages = await ChatMessage.find().populate("user", "username");

        // Update messages to include the isSender property
        const updatedMessages = messages.map((msg) => ({
            ...msg._doc,
            isSender: msg.user._id.toString() === userId.toString(),
        }));
        res.status(200).json({ messages: updatedMessages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});


module.exports = router;
