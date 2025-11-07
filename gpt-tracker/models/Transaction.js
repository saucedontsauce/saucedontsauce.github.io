import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        currency: {
            type: String,
            required: true,
            enum: ["USD", "EUR", "GBP", "INR", "JPY", "AUD"],
            default: "USD",
        },
        website: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: function (v) {
                    return /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i.test(v);
                },
                message: (props) => `${props.value} is not a valid URL!`,
            },
        },
        type: {
            type: String,
            required: true,
            enum: ["deposit", "withdrawal", "purchase", "refund", "transfer"],
        },
        status: {
            type: String,
            enum: ["pending", "completed", "failed", "cancelled"],
            default: "pending",
        },
        metadata: {
            type: Map,
            of: String,
        },
    },
    { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
