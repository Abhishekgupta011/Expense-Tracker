import React, { useEffect, useState } from "react";
import ExpenseList from "./ExpenseList";
import './ExpenseForm.css';


const ExpenseForm = () => {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState("");
    const [products, setProducts] = useState([]);
    
    const descriptionHandler = (event) => {
        setDescription(event.target.value);
    }

    const amountHandler = (event) => {
        setAmount(event.target.value);
    }

    const categoryHandler = (event) => {
        setCategory(event.target.value);
    }

    const getExpenses = async () => {
        try {
            const response = await fetch("https://expensetracker-e9a1b-default-rtdb.firebaseio.com/expenses.json", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                const expensesArray = Object.values(data);
                setProducts(expensesArray);
                // console.log("expensesArray" , expensesArray)
                // console.log("products" , products)
            }
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    }

    const generateUniqueId = () => {
        return Date.now(); // Using timestamp as a simple way to generate a unique ID
    }

    const ExpenseProductListHandler = async (event) => {
        event.preventDefault();
        

        try {
            const response = await fetch("https://expensetracker-e9a1b-default-rtdb.firebaseio.com/expenses.json", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    
                        id: generateUniqueId(), // Set a unique ID using the timestamp
                        description,
                        amount,
                        category,
                    
                })
            });

            if (response.ok) {

                alert('Product added successfully');
                setProducts([...products, {id: generateUniqueId(),
                description,
                amount,
                category,}]);
                setAmount('');
                setCategory('');
                setDescription('');
                
            }
        } catch (error) {
            console.error('Something went wrong', error);
        }
    }

    const editExpenseHandler = async (expense)=>{

        setDescription(expense.description);
        setAmount(expense.amount);
        setCategory(expense.category);
        try {
            const updatedExpense = {
                id: expense.id,
                description,
                amount,
                category,
            };

            const response = await fetch(`https://expensetracker-e9a1b-default-rtdb.firebaseio.com/expenses/${expense.id}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedExpense),
            });

            if (response.ok) {
                alert('Expense updated successfully');
                const updatedProducts = products.map((p) => (p.id === expense.id ? updatedExpense : p));
                setProducts(updatedProducts);
            } else {
                console.error('Failed to update expense');
            }
        } catch (error) {
            console.error('Something went wrong', error);
        }
    }

    const deleteExpenseHandler = async (id) =>{
        try {
            // Delete expense from the API
            const response = await fetch(`https://expensetracker-e9a1b-default-rtdb.firebaseio.com/expenses/${id}.json`, {
                method: 'DELETE',
                
            });

            if (response.ok) {
                alert('Expense deleted successfully');

                // Delete expense from the UI
                const updatedProducts = products.filter((p) => p.id !== id);
        
                setProducts(updatedProducts);
            } else {
                const errorData = await response.json();
                console.error('Failed to delete expense:', errorData);
            }
        } catch (error) {
            console.error('Something went wrong', error);
        }
}


    useEffect(() => {
        console.log("useEffect is running");
        getExpenses();
    }, []);

    // useEffect(()=>{
    //     console.log("useffect product" , products)
    // })


    return (
        <>
        <form className="expense-form" onSubmit={ExpenseProductListHandler}>
            <label htmlFor="description">Description</label>
            <input type="text" id="description" value={description} onChange={descriptionHandler} placeholder="Describe here" />
            <label htmlFor="amount">Amount</label>
            <input type="text" id="amount" value={amount} onChange={amountHandler} placeholder="Enter amount" />
            <label htmlFor="category">Category</label>
            <input type="text" id="category" value={category} onChange={categoryHandler} placeholder="Describe here" />
            <button type="submit">Add Expense</button>  
        </form>
        <ExpenseList 
        products={products}  
        onEditExpense={editExpenseHandler}
        onDeleteExpense={deleteExpenseHandler}/>
        </>
    );
}

export default ExpenseForm;
