import React, { useEffect, useState } from "react";
import ExpenseList from "./ExpenseList";
import './ExpenseForm.css';
import { expensesActions } from "../../Store/ExpenseSlice";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../Store/ThemeSlice";
import { v4 as uuidv4 } from 'uuid';

// ... (previous imports and code)

const ExpenseForm = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.expense.products);
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const onEdited = useSelector((state) => state.expense.onEdited);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState("");
    const [selectedExpense, setSelectedExpense] = useState(null); // New state to store the selected expense

    const crudUrl = "https://crudcrud.com/api/4bbd04f4d89a48108dc57e544333073f";

    const descriptionHandler = (event) => {
        setDescription(event.target.value);
    };

    const amountHandler = (event) => {
        setAmount(event.target.value);
    };

    const categoryHandler = (event) => {
        setCategory(event.target.value);
    };

    const getExpenses = async () => {
        try {
            const response = await fetch(`${crudUrl}/expenses`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                const expensesArray = Object.values(data);

                if (data.length > 0) {
                    dispatch(expensesActions.initialExpenses(expensesArray));
                }
            }
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const generateId = () => {
        return uuidv4();
    };

    const ExpenseProductListHandler = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${crudUrl}/expenses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: generateId(),
                    description,
                    amount,
                    category,
                })
            });

            if (response.ok) {
                alert('Product added successfully');
                getExpenses();
                dispatch(expensesActions.addExpense({
                    id: generateId(),
                    description,
                    amount,
                    category,
                }));
                setAmount('');
                setCategory('');
                setDescription('');
            }
        } catch (error) {
            console.error('Something went wrong', error);
        }
    };

    const editExpenseHandler = async () => {
        if (!selectedExpense) {
            console.error('No expense selected for editing.');
            return;
        }

        const updatedExpense = {
            id: selectedExpense.id,
            description,
            amount,
            category,
        };
        console.log("ffffff" , updatedExpense)
        try {
            const response = await fetch(`${crudUrl}/expenses/${selectedExpense._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedExpense),
            });

            if (response.ok) {
                alert('Expense updated successfully');
                const updatedProducts = products.map((p) => (p._id === selectedExpense._id ? updatedExpense : p));
                
                dispatch(expensesActions.editExpense(updatedProducts));
                dispatch(expensesActions.setEdited(false));
                console.log("updated" , updatedProducts)
                setDescription('');
                setAmount('');
                setCategory('');
                setSelectedExpense(null); // Reset the selected expense
            } else {
                console.error('Failed to update expense');
            }
        } catch (error) {
            console.error('Something went wrong', error);
        }
    };

    const deleteExpenseHandler = async (_id) => {
        try {
            const response = await fetch(`${crudUrl}/expenses/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Expense deleted successfully');
                dispatch(expensesActions.deleteExpense(_id));
            } else {
                const errorData = await response.json();
                console.error('Failed to delete expense:', errorData);
            }
        } catch (error) {
            console.error('Something went wrong', error);
        }
    };

    const onEditExpense = (expense) => {
        dispatch(expensesActions.setEdited(true));
        setDescription(expense.description);
        setAmount(expense.amount);
        setCategory(expense.category);
        setSelectedExpense(expense); // Set the selected expense
    };

    useEffect(() => {
        console.log("useEffect is running");
        getExpenses();
    }, []);

    const totalExpenses = products.reduce((total, expense) => total + parseFloat(expense.amount), 0);

    const toggleDarkModeHandler = () => {
        console.log(dispatch(themeActions.isDarkModeTrue()));
        console.log('light');
    };

    const downloadCSVHandler = (event) => {
        event.preventDefault();
        const csvContent = "id,description,amount,category\n" +
            products.map(expense => Object.values(expense).join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'expenses.csv';
        link.click();
    };

    return (
        <>
            <form className={`expense-form ${isDarkMode ? 'dark' : ''}`} onSubmit={ExpenseProductListHandler}>
                <label htmlFor="description">Description</label>
                <input type="text" id="description" value={description} onChange={descriptionHandler} placeholder="Describe here" />
                <label htmlFor="amount">Amount</label>
                <input type="text" id="amount" value={amount} onChange={amountHandler} placeholder="Enter amount" />
                <label htmlFor="category">Category</label>
                <input type="text" id="category" value={category} onChange={categoryHandler} placeholder="Describe here" />
                {onEdited ? <button type="button" onClick={editExpenseHandler}>Update Expense</button> : <button type="submit">Add Expense</button>}
                <h3>Total Expenses: {totalExpenses}</h3>
                {totalExpenses > 10000 && <button type="button">Activate Premium</button>}
                <button type="button" onClick={toggleDarkModeHandler}>
                    {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </button>
                <button type="button" onClick={downloadCSVHandler}>
                    Download CSV
                </button>
            </form>
            <ExpenseList
                products={products}
                onEditExpense={onEditExpense}
                onDeleteExpense={deleteExpenseHandler} />
        </>
    );
};

export default ExpenseForm;
