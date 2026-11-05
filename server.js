const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const { verifyToken, authorizeAdmin } =
    require("./middleware/authMiddleware");

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use("/api/auth", authRoutes);

// Protected route
app.get("/profile", verifyToken, (req, res) => {
    res.json({ message: "Protected profile", user: req.user });
});

// Admin-only route
app.get("/admin", verifyToken, authorizeAdmin, (req, res) => {
    res.json({ message: "Welcome Admin" });
});

app.listen(process.env.PORT, () => {
    console.log("Server running on port 5000");
});