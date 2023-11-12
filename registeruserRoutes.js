// registeruserRoutes.js
const express = require("express");
const router = express.Router();
const Registeruser = require("./model");
const jwt = require("jsonwebtoken");

// Register a new user
router.post("/register", async (req, res) => {
    try {
        const { username, email, password, confirmpassword } = req.body;
        let exist = await Registeruser.findOne({ email });

        if (exist) {
            return res.status(400).send("User Already Exist");
        }

        if (password !== confirmpassword) {
            return res.status(400).send("Passwords are not matching");
        }

        const newUser = new Registeruser({
            username,
            email,
            password,
            confirmpassword,
        });

        await newUser.save();

        // Generate and send a JWT token upon successful registration
        const payload = {
            user: {
                id: newUser._id,
            },
        };

        jwt.sign(payload, "tbk", { expiresIn: 3600000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }
});

module.exports = router;
