import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema(
    {
        category: String,
        modeOfPayment: String,
        amount: Number,
        message: String,
        type: String,
    },
    { timestamps: true }
);

export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
