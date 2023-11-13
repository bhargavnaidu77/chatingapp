// server.js
require("dotenv").config();
const ChatMessage = require("./chatMessageModel");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const registeruserRoutes = require("./registeruserRoutes");
const chatRoutes = require("./chatRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MONGO_URL = process.env.MONGO_URL;
const PORT =process.env.PORT;

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("MongoDB connected...");
    })
    .catch(error => {
        console.error("Error connecting to MongoDB:", error);
    });

app.use("/registeruser", registeruserRoutes);
app.use("/chat", chatRoutes);
app.delete("/deleteAllMessages", async (req, res) => {
    try {
        // Delete all messages
        await ChatMessage.deleteMany();

        res.status(200).json({ message: "All messages deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
