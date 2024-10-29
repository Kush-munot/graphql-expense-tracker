export type ExpenseType = {
    id: string;
    category: string,
    modeOfPayment: string,
    amount: number,
    message: string,
    type: string,
};

export interface AddExpenseArgs {
    category: string,
    modeOfPayment: string,
    amount: number,
    message: string,
    type: string,
}

export interface UpdateExpenseArgs {
    id: string;
    category?: string,
    modeOfPayment?: string,
    amount?: number,
    message?: string,
    type?: string,
}

export interface DeleteExpenseArgs {
    id: string;
}

export interface GetExpenseArgs {
    id: string;
}