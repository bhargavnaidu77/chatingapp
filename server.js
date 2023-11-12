// server.js
require("dotenv").config();
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
