import React, { useState } from "react";
import ExpenseList from "./ExpenseList";
import './ExpenseForm.css'

const ExpenseForm = ()=>{
    const [description , setDescription] = useState("")
    const [amount , setAmount] = useState('');
    const [category , setCategory] = useState("");
    const [products, setProducts] = useState([]);

    const descriptionHandler = (event)=>{
        setDescription(event.target.value)
    }
    const amountHandler = (event)=>{
        setAmount(event.target.value)
    }
    const categoryHandler = (event)=>{
        setCategory(event.target.value)
    }
    const ExpenseProductListHandler = (event)=>{
        event.preventDefault();
        const product = {
            description,
            amount,
            category,
        }
        setProducts([...products, product]);
    }
    return(
        <form className="expense-form">
            <label htmlFor="description">Description</label>
            <input type="text" id="description" value={description} onChange={descriptionHandler} placeholder="Describe here"/>
            <label htmlFor="amount">Amount</label>
            <input type="text" id="amount" value={amount} onChange={amountHandler} placeholder="Enter amount"/>
            <label htmlFor="category">Category</label>
            <input type="text" id="category" value={category} onChange={categoryHandler} placeholder="Describe here"/>
            <button onClick={ExpenseProductListHandler}>Add Expense</button>
            <ExpenseList products={products}/>
        </form>
    )
}

export default ExpenseForm;