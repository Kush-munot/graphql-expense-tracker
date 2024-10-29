import Expense from "../models/Expense";
import { AddExpenseArgs, DeleteExpenseArgs, ExpenseType, GetExpenseArgs, UpdateExpenseArgs } from "./types";

export const resolvers = {
    Query: {
        getExpenses: async (): Promise<ExpenseType[]> => {
            return await Expense.find();
        },
        getExpense: async (_: unknown, { id }: GetExpenseArgs): Promise<ExpenseType | null> => {
            return await Expense.findById(id);
        },
    },
    Mutation: {
        addExpense: async (_: unknown, { category, modeOfPayment, amount, message, type }: AddExpenseArgs): Promise<ExpenseType> => {
            const newExpense = new Expense({ category, modeOfPayment, amount, message, type });
            await newExpense.save();
            return newExpense;
        },
        updateExpense: async (_: unknown, { id, category, modeOfPayment, amount, message, type }: UpdateExpenseArgs): Promise<ExpenseType | null> => {
            const updatedExpense = await Expense.findByIdAndUpdate(id, { category, modeOfPayment, amount, message, type }, { new: true });
            return updatedExpense;
        },
        deleteExpense: async (_: unknown, { id }: DeleteExpenseArgs): Promise<ExpenseType | null> => {
            const deletedExpense = await Expense.findByIdAndDelete(id);
            return deletedExpense;
        },
    },
};
