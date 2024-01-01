import React from "react";
import './ExpenseList.css';
import { useSelector } from "react-redux";

const ExpenseList = (props) => {
  const products = useSelector((state)=>state.expense.products);
  //console.log('productList' , products)
    return (
        <div className="list">
            <ol className="order">
                {products.map((product) =>  {
                    // console.log('description' , product.description)
                    console.log('id' , product.id)
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
