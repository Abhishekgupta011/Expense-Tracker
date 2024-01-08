import React from "react";
import './ExpenseList.css';
import { useSelector } from "react-redux";

const ExpenseList = (props) => {
  const products = useSelector((state) => state.expense.products);

  const getSanitizedEmail = props.getSanitizedEmail;

  return (
    <div className="list">
      <ol className="order">
        {products.length > 0 && (
          <li className="listitems title-row">
            <span className="des">Description</span>
            <span className="am">Amount</span>
            <span className="cat">Category</span>
            <span className="actions">Actions</span>
          </li>
        )}
        {products.map((product) => {
          return (
            <li className="listitems" key={product.id}>
              <span className="des">{product.description}</span>
              <span className="am">{product.amount}</span>
              <span className="cat">{product.category}</span>
              <span className="actions">
                <button onClick={() => props.onEditExpense(product)} className="edit">
                  Edit
                </button>
                <button onClick={() => props.onDeleteExpense(product._id, getSanitizedEmail())} className="delete">
                  Delete
                </button>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default ExpenseList;
