import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
import expressLayouts from "express-ejs-layouts";
import jwt from "jsonwebtoken";

import viewRoutes from "./routes/viewRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminUserRoutes.js";
import { get } from "http";

import getUserFromToken from "./util/getUserFromToken.js";

dotenv.config();

const app = express();

// Middleware for forms & JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Sessions (needed for flash)
app.use(
    session({
        secret: process.env.SESSION_SECRET || "keyboardcat",
        resave: false,
        saveUninitialized: false,
    })
);

// Flash messages
app.use(flash());

// Make flash messages available to views
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// EJS setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout");

// MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/", viewRoutes); // view routes
app.use("/public", express.static(path.join(__dirname, "public"))); // static files
app.use("/api/users", userRoutes); // user api routes
app.use("/api/admin", adminRoutes); // admin api routes

app.use("/api/data", (req, res) => {
    res.json({ message: "Data endpoint" });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render("404", { title: "404 - Not Found", appName: "GPT Tracker", user: getUserFromToken(req) });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
