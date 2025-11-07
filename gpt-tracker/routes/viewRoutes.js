import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import { name } from "ejs";

import { Currency, CurrencyConversionRates } from "../util/Currency.js";
import getUserFromToken from "../util/getUserFromToken.js";

const router = express.Router();

// Home
router.get("/", (req, res) => {
    res.render("index", { title: "Home", appName: "GPT Tracker", user: getUserFromToken(req) });
});

// Register form
router.get("/register", (req, res) => {
    res.render("register", { title: "Register", appName: "GPT Tracker", user: getUserFromToken(req), Currency });
});

// Login form
router.get("/login", (req, res) => {
    res.render("login", { title: "Login", appName: "GPT Tracker", user: getUserFromToken(req) });
});



// Dashboard
router.get("/dashboard", async (req, res) => {
    const decoded = getUserFromToken(req);
    if (!decoded) {
        req.flash("error", "Please log in first");
        return res.redirect("/login");
    }

    const user = await User.findById(decoded.id);
    const transactions = await Transaction.find({ userId: user._id }).sort({
        createdAt: -1,
    });

    res.render("dashboard", {
        title: "Dashboard",
        appName: "GPT Tracker",
        user,
        transactions,
    });
});

// Logout
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    req.flash("success", "Logged out successfully");
    res.redirect("/");
});


// POSTS
// Register handler
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existing = await User.findOne({ email });
        if (existing) {
            req.flash("error", "User already exists");
            return res.redirect("/register");
        }

        const user = await User.create({ name, email, password });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        res.cookie("token", token, { httpOnly: true });
        req.flash("success", "Registration successful!");
        res.redirect("/dashboard");
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/register");
    }
});

// Login handler
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            req.flash("error", "Invalid email or password");
            return res.redirect("/login");
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        res.cookie("token", token, { httpOnly: true });
        req.flash("success", "Welcome back!");
        res.redirect("/dashboard");
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/login");
    }
});

router.post("/transactions", async (req, res) => {
    const decoded = getUserFromToken(req);
    if (!decoded) {
        req.flash("error", "Please log in first");
        return res.redirect("/login");
    }

    try {
        const { amount, currency, website, type, status } = req.body;

        await Transaction.create({
            userId: decoded.id,
            amount,
            currency,
            website,
            type,
            status,
        });

        req.flash("success", "Transaction created successfully!");
        res.redirect("/dashboard");
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/dashboard");
    }
});

export default router;
