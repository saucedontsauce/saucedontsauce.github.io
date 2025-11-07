import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/")
    .get(protect, admin, getUsers); // Get all users

router.route("/:id")
    .get(protect, admin, getUserById) // Get single user
    .put(protect, admin, updateUser)  // Update user
    .delete(protect, admin, deleteUser); // Delete user

export default router;
