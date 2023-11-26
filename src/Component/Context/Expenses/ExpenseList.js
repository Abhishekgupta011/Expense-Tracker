import React from "react";
import './ExpenseList.css';

const ExpenseList = (props) => {
  
    return (
        <div className="list">
            <ol className="order">
                {props.products.map((product) =>  {
    
                    return (
                        <li className="listitems" key={product.id}>
                            <span className="des">{product.description}</span>
                            <span className="am">{product.amount}</span>
                            <span className="cat">{product.category}</span>
                            <button onClick={()=>props.onEditExpense(product)}>Edit</button>
                            <button onClick={()=>props.onDeleteExpense(product.id)}>Delete</button>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}

export default ExpenseList;
