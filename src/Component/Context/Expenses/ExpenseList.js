import React from "react";
import './ExpenseList.css';

const ExpenseList = (props) => {
    return (
        <div className="list">
            <ol className="order">
                {props.products.map((product) => (
                    <div key={product.id} className="listitems">
                        <li key={`description_${product.id}`}>
                            <span className="des">{product.description}</span>
                        </li>
                        <li key={`amount_${product.id}`}>
                            <span className="am">{product.amount}</span>
                        </li>
                        <li key={`category_${product.id}`}>
                            <span className="cat">{product.category}</span>
                        </li>
                    </div>
                ))}
            </ol>
        </div>
    );
}

export default ExpenseList;
