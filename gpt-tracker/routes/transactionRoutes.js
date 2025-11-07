import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
    createTransaction,
    getTransactions,
    getTransactionById,
    deleteTransaction,
    getAllTransactions,
} from "../controllers/transactionController.js";

const router = express.Router();

// User routes
router.route("/")
    .post(protect, createTransaction)
    .get(protect, getTransactions);

router.route("/:id")
    .get(protect, getTransactionById)
    .delete(protect, deleteTransaction);

// Admin route
router.get("/all", protect, admin, getAllTransactions);

export default router;
