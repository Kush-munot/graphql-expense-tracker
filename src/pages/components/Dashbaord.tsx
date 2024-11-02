import { Alert, Box, Button, Chip, Divider, FormControl, Grid, InputLabel, MenuItem, Modal, Select, Snackbar, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { addExpenseGrid, btn, chipStyles, editDeleteButtonGrid, expenseAmountStyle, expenseAmtStack, expenseMsgStyle, iconStyles, masterGrid, style } from '../globalStyles';
import { useQuery } from '@apollo/client';
import { ADD_EXPENSE, EDIT_EXPENSE, GET_EXPENSES } from '../api/graphql/schema/typeDefs';



const Dashbaord = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        // Clear form
        setAmount(0);
        setMessage('');
        setExpenseType('');
        setCategory('');
        setModeOfPayment('');
        // Reset editing state
        setIsEditing(false);
        setEditingId(null);
    };

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msg, setMsg] = useState('');
    const [severity, setSeverity] = useState('');
    const handleCloseSnackbar = () => setOpenSnackbar(false);

    const [message, setMessage] = React.useState('');
    const [amount, setAmount] = React.useState(0);
    const [expenseType, setExpenseType] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [modeOfPayment, setModeOfPayment] = React.useState('');
    const handleMessage = (event: { target: { value: React.SetStateAction<string>; }; }) => setMessage(event.target.value);
    const handleAmount = (event: { target: { value: React.SetStateAction<number>; }; }) => setAmount(event.target.value);
    const handleExpenseType = (event: { target: { value: React.SetStateAction<string>; }; }) => setExpenseType(event.target.value);
    const handleCategory = (event: { target: { value: React.SetStateAction<string>; }; }) => setCategory(event.target.value);
    const handleModeOfPayment = (event: { target: { value: React.SetStateAction<string>; }; }) => setModeOfPayment(event.target.value);

    const [expenseData, setExpenseData] = React.useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await fetch('/api/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `query GetExpenses {
                        getExpenses {
                            id
                            category
                            modeOfPayment
                            amount
                            message
                            type
                        }
                    }
                    `
                }),
            });

            const { data, errors } = await response.json();

            if (errors) {
                setError(errors[0].message);
                setMsg('An error occurred. Please try again - ' + error);
                setOpenSnackbar(true);
                setSeverity('error');
            } else {
                setExpenseData(data.getExpenses);
            }
        } catch (err) {
            setError("An error occurred while fetching expenses -" + err);
            setMsg(error);
            setOpenSnackbar(true);
            setSeverity('error');
        } finally {
            setLoading(false);
        }
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    const handleSubmit = async () => {
        try {
            // If any required field is empty, show error
            if (!amount || !message || !expenseType || !category || !modeOfPayment) {
                setMsg('Please fill all fields');
                setSeverity('error');
                setOpenSnackbar(true);
                return;
            }

            const mutation = isEditing ?
                `mutation UpdateExpense($id: ID!, $category: String!, $modeOfPayment: String!, $amount: Float!, $message: String!, $type: String!) {
                    updateExpense(
                        id: $id,
                        category: $category,
                        modeOfPayment: $modeOfPayment,
                        amount: $amount,
                        message: $message,
                        type: $type
                    ) {
                        id
                        category
                        modeOfPayment
                        amount
                        message
                        type
                    }
                }`
                :
                `mutation AddExpense($category: String!, $modeOfPayment: String!, $amount: Float!, $message: String!, $type: String!) {
                    addExpense(
                        category: $category,
                        modeOfPayment: $modeOfPayment,
                        amount: $amount,
                        message: $message,
                        type: $type
                    ) {
                        id
                        category
                        modeOfPayment
                        amount
                        message
                        type
                    }
                }`

            const variables = {
                ...(isEditing && { id: editingId }),
                category,
                modeOfPayment,
                amount: parseFloat(amount),
                message,
                type: expenseType
            };

            const response = await fetch('/api/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: mutation,
                    variables
                }),
            });

            const { data, errors } = await response.json();

            if (errors) {
                throw new Error(errors[0].message);
            }

            if (data) {
                // Clear form
                setAmount(0);
                setMessage('');
                setExpenseType('');
                setCategory('');
                setModeOfPayment('');
                setEditingId(null);
                setIsEditing(false);

                // Show success message
                setMsg(isEditing ? 'Expense updated successfully!' : 'Expense added successfully!');
                setSeverity('success');
                setOpenSnackbar(true);

                // Close modal
                handleClose();

                // Refresh expenses list
                fetchExpenses();
            }
        } catch (err) {
            setMsg(err instanceof Error ? err.message : 'Failed to save expense');
            setSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleEdit = (expense) => {
        // Set editing mode
        setIsEditing(true);
        setEditingId(expense.id);

        // Populate form with existing data
        setAmount(expense.amount);
        setMessage(expense.message);
        setExpenseType(expense.type);
        setCategory(expense.category);
        setModeOfPayment(expense.modeOfPayment);

        // Open modal
        handleOpen();
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch('/api/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query:
                        `mutation DeleteExpense($id: ID!) {
                            deleteExpense(id: $id) {
                                id
                            }
                        }`
                    ,
                    variables: {
                        id: id
                    }
                }),
            });

            const { data, errors } = await response.json();

            if (errors) {
                throw new Error(errors[0].message);
            }

            if (data) {
                // Update the local state to remove the deleted expense
                setExpenseData(prevExpenses =>
                    prevExpenses.filter(expense => expense.id !== id)
                );

                setMsg('Expense deleted successfully!');
                setSeverity('success');
                setOpenSnackbar(true);
            }
        } catch (err) {
            setMsg(err instanceof Error ? err.message : 'Failed to delete expense');
            setSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const typez = ['Income', 'Expense'];
    const categoryz = [
        'Entertainment & Leisure',
        'Food & Beverages',
        'Health & Personal Care',
        'Investments',
        'Miscellaneous',
        'Shopping',
        'Transportation',
        'Travel',
        'Utilities & Bills'
    ]
    const modeOfPaymentz = ['Cash', 'Credit Card', 'UPI']

    const calculateTotal = (expenses) => {
        return expenses.reduce((total, expense) => {
            const amount = parseFloat(expense.amount);
            return total + (expense.type === 'Income' ? amount : -amount);
        }, 0);
    };

    const formatTotal = (total) => {
        const absoluteTotal = Math.abs(total);
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(absoluteTotal);
    };

    return (
        <>
            <Box style={{ padding: '8rem 0rem', minHeight: 'calc(100vh - 440px)', }}>
                <Box sx={{ padding: '0 15%', "@media (max-width:760px)": { padding: '0' }, }}>
                    <Grid container spacing={2} sx={masterGrid}>
                        <Grid sx={{ marginLeft: '0', marginTop: '0', padding: '0 2rem' }} md={6} sm={6} xs={6}>
                            <h6 style={{ margin: '0.4rem 0 0 0', fontWeight: '400' }}>Total Spends</h6>
                            <h2 style={{ margin: '0.4rem 0' }}>{formatTotal(calculateTotal(expenseData))}</h2>
                        </Grid>
                        <Grid sx={addExpenseGrid} md={6} sm={6} xs={6}>
                            <Button onClick={handleOpen} sx={btn("140px")}>+ Expense</Button>
                        </Grid>
                        {expenseData.slice().reverse().map((expense, index) => {
                            return (
                                <Grid key={index} container spacing={2} sx={{
                                    marginLeft: '0', marginTop: '0',
                                    fontFamily: 'Inter'
                                }}>
                                    <Divider sx={{ width: '100%', backgroundColor: '#1976d2' }} />
                                    <Grid sx={{ marginLeft: '0', marginTop: '0', padding: '0.5rem' }} md={10} sm={10} xs={10}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Stack sx={expenseAmtStack}>
                                                <Typography sx={{ ...expenseAmountStyle, fontSize: '0.85rem', fontWeight: '500' }}>
                                                    INR
                                                </Typography>
                                                <Typography sx={{ ...expenseAmountStyle, fontSize: '1rem', fontWeight: '700' }}>
                                                    {expense.amount}
                                                </Typography>
                                            </Stack>
                                            <Stack sx={{ width: '100%' }}>

                                                <Typography sx={expenseMsgStyle}>
                                                    {expense.message}
                                                </Typography>
                                            </Stack>
                                            <Chip sx={{
                                                ...chipStyles, color: '#fff', margin: '0 0 0 5%', backgroundColor: '#FF5722',

                                            }} label={expense.category} />
                                            <Chip sx={{
                                                ...chipStyles, color: '#000', margin: '0 5px', backgroundColor: '#FFC107',

                                            }} label={expense.modeOfPayment} />


                                        </Box>
                                    </Grid>
                                    <Grid md={2} sm={2} xs={2} sx={editDeleteButtonGrid}>
                                        <EditIcon
                                            onClick={() => handleEdit(expense)}
                                            sx={iconStyles}
                                        />
                                        <DeleteIcon
                                            onClick={() => handleDelete(expense.id)}
                                            sx={iconStyles}
                                        />
                                    </Grid>

                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography sx={{ fontFamily: 'Inter', fontSize: '1.5rem', fontWeight: '700' }}>Add New Expense 💰</Typography>
                    <TextField fullWidth value={amount} id="outlined-basic" label="Amount" variant="outlined" sx={{ margin: '0.5rem 0' }} onChange={handleAmount} />
                    <TextField fullWidth value={message} id="outlined-basic" label="Message" variant="outlined" sx={{ margin: '0.5rem 0' }} onChange={handleMessage} />
                    <FormControl fullWidth sx={{ margin: '0.5rem 0' }}>
                        <InputLabel id="expense-type-label">Select Expense Type</InputLabel>
                        <Select
                            labelId="Expense Type"
                            id="expense-type"
                            value={expenseType}
                            label="Type"
                            onChange={handleExpenseType}
                        >
                            {typez.map((d, index) => (
                                <MenuItem key={index} value={d}>
                                    {d}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ margin: '0.5rem 0' }}>
                        <InputLabel id="category-label">Select Category</InputLabel>
                        <Select
                            labelId="Category"
                            id="category"
                            value={category}
                            label="Category"
                            onChange={handleCategory}
                        >
                            {categoryz.map((d, index) => (
                                <MenuItem key={index} value={d}>
                                    {d}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ margin: '0.5rem 0' }}>
                        <InputLabel id="modeOfPayment-label">Select Mode Of Payment</InputLabel>
                        <Select
                            labelId="modeOfPayment"
                            id="modeOfPayment"
                            value={modeOfPayment}
                            label="Mode Of Payment"
                            onChange={handleModeOfPayment}
                        >
                            {modeOfPaymentz.map((d, index) => (
                                <MenuItem key={index} value={d}>
                                    {d}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button onClick={handleSubmit} sx={btn("130px")}>
                        {isEditing ? 'Update' : 'Submit'}
                    </Button>
                </Box>
            </Modal>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>

        </>
    )
}

export default Dashbaord