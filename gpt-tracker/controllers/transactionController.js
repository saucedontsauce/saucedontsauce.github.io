import Transaction from "../models/Transaction.js";

// @desc    Create a new transaction
// @route   POST /api/transactions
// @access  Private
export const createTransaction = async (req, res) => {
    const { amount, currency, website, type, status, metadata } = req.body;

    try {
        const transaction = await Transaction.create({
            userId: req.user._id,
            amount,
            currency,
            website,
            type,
            status,
            metadata,
        });

        res.status(201).json(transaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get all transactions for logged-in user
// @route   GET /api/transactions
// @access  Private
export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user._id }).sort({
            createdAt: -1,
        });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Get single transaction by ID
// @route   GET /api/transactions/:id
// @access  Private
export const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.json(transaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Private
export const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.json({ message: "Transaction removed" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// @desc    Get all transactions (admin only)
// @route   GET /api/transactions/all
// @access  Private/Admin
export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({})
            .populate("userId", "name email role") // show user info
            .sort({ createdAt: -1 });

        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};