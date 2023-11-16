import React from "react";
import './ExpenseList.css'
const ExpenseList = (props) =>{
    return(
        <div className="list">
            <ol className="order">
                {props.products.map((product)=>(
                 <div>
                    <li className="listitems">
                       <span className="des">{product.description}</span> 
                       <span className="am">{product.amount}</span>
                       <span className="cat">{product.category}</span> 
                    </li>
                 </div>
                ))}
            </ol>
        </div>
    )
}
export default ExpenseList;