import React, { useEffect, useState } from "react";
import ExpenseList from "./ExpenseList";
import './ExpenseForm.css';
import { expensesActions } from "../../Store/ExpenseSlice";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../Store/ThemeSlice";
import { v4 as uuidv4 } from 'uuid';

const ExpenseForm = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.expense.products);
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const onEdited = useSelector((state) => state.expense.onEdited);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState("");
    const [selectedExpense, setSelectedExpense] = useState(null); // New state to store the selected expense
    const [loading, setLoading] = useState(false);

    const crudUrl = "https://crudcrud.com/api/4332f7ee90294058ad291300fde42720";
    const getSanitizedEmail = () => {
        let email = localStorage.getItem("email");
        console.log(email)
        if (email) {
          const updatedEmail = email.replace(/[^a-zA-Z0-9]/g, "");
          console.log(updatedEmail);
          return updatedEmail;
        }
        
        return null;
        
      };
    const descriptionHandler = (event) => {
        setDescription(event.target.value);
    };

    const amountHandler = (event) => {
        setAmount(event.target.value);
    };

    const categoryHandler = (event) => {
        setCategory(event.target.value);
    };

    const getExpenses = async (updatedEmail) => {
        try {
            const response = await fetch(`${crudUrl}/expenses${updatedEmail}`, {
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
            }else {
                console.error('Fetch error:', response.status); // Log the error status
            }
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const generateId = () => {
        return uuidv4();
    };

    const ExpenseProductListHandler = async (event,updatedEmail) => {
        event.preventDefault();

        try {
            setLoading(true)
            const response = await fetch(`${crudUrl}/expenses${updatedEmail}`, {
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
                console.log('Product added successfully');
                getExpenses(updatedEmail);
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
        }finally {
            setLoading(false); // Set loading to false after the API call is completed
        }
    };
    const onEditExpense = (expense) => {
        dispatch(expensesActions.setEdited(true));
        setDescription(expense.description);
        setAmount(expense.amount);
        setCategory(expense.category);
        setSelectedExpense(expense); // Set the selected expense
    };

    const editExpenseHandler = async (updatedEmail) => {
        console.log(updatedEmail)
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
        //console.log("ffffff" , updatedExpense)
        try {
            setLoading(true)
            const response = await fetch(`${crudUrl}/expenses${updatedEmail}/${selectedExpense._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedExpense),
            });

            if (response.ok) {
                console.log('Expense updated successfully');
                dispatch(expensesActions.editExpense( updatedExpense ));
                dispatch(expensesActions.setEdited(false));
                //console.log("updated" , updatedExpense)
                setDescription('');
                setAmount('');
                setCategory('');
                setSelectedExpense(null); // Reset the selected expense
            } else {
                console.error('Failed to update expense');
            }
        } catch (error) {
            console.error('Something went wrong', error);
        }finally {
            setLoading(false); // Set loading to false after the API call is completed
        }
    };

    const deleteExpenseHandler = async (_id , updatedEmail) => {
        console.log('Deleting expense with _id:', _id);
        console.log('Updated email:', updatedEmail);
        try {
            setLoading(true)
            const response = await fetch(`${crudUrl}/expenses${updatedEmail}/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Expense deleted successfully');
                dispatch(expensesActions.deleteExpense(_id));
            } else {
                const errorData = await response.json();
                console.error('Failed to delete expense:', errorData);
            }
        } catch (error) {
            console.error('Something went wrong', error);
        }finally {
            setLoading(false); // Set loading to false after the API call is completed
        }
    };

    useEffect(() => {
        console.log("useEffect is running");
        const updatedEmail = getSanitizedEmail()
        getExpenses(updatedEmail);
    }, [selectedExpense]);
    

    const totalExpenses = products.reduce((total, expense) => total + parseFloat(expense.amount), 0);

    const toggleDarkModeHandler = () => {
        console.log(dispatch(themeActions.isDarkModeTrue()));
        console.log('light');
    };

    const downloadCSVHandler = (event) => {
        event.preventDefault();
        const csvContent = "description,amount,category\n" +
            products.map(({ id, ...rest }) => Object.values(rest).join(",")).join("\n");
    
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'expenses.csv';
        link.click();
    };
    

    return (
        <>
        {loading && (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            )}
            <form className={`expense-form ${isDarkMode ? 'dark' : ''}`} 
            onSubmit={(e) => ExpenseProductListHandler(e, getSanitizedEmail())}>
                <label htmlFor="description">Description</label>
                <input 
                type="text" 
                id="description" 
                value={description} 
                onChange={descriptionHandler} 
                placeholder="Describe here"
                required />
                <label htmlFor="amount">Amount</label>
                <input 
                type="number" 
                id="amount" 
                value={amount} 
                onChange={amountHandler} 
                placeholder="Enter amount"
                required />
                <label htmlFor="category">Category</label>
                <input 
                type="text" 
                id="category" 
                value={category} 
                onChange={categoryHandler} 
                placeholder="Describe here"
                required />
                {onEdited ? <button type="button" 
                onClick={()=>editExpenseHandler(getSanitizedEmail())}
                >Update Expense</button> : <button type="submit" className="add-expense">Add Expense</button>}
                <h3>Total Expenses: {totalExpenses}</h3>
                {totalExpenses > 10000 && <button type="button">Activate Premium</button>}
                <button type="button" onClick={toggleDarkModeHandler} className={`${isDarkMode ? 'switch-light' : 'switch-dark'}`}>
                    {isDarkMode && "Switch to Light Mode" }
                    {!isDarkMode&& "Switch to Dark Mode"}
                </button>
                <button type="button" className="download-button" onClick={downloadCSVHandler}>
                    Download CSV
                </button>
            </form>
            <ExpenseList
                products={products}
                onEditExpense={onEditExpense}
                onDeleteExpense={deleteExpenseHandler}
                getSanitizedEmail={getSanitizedEmail} />
        </>
    );
};

export default ExpenseForm;
