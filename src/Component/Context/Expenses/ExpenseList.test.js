import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import ExpenseList from "./ExpenseList";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { userEvent } from "@testing-library/user-event";

const mockStore = configureStore([]);

describe("ExpenseList", () => {
  test("renders expense list correctly", () => {
    const products = [
      { id: 1, description: "Product 1", amount: 10, category: "Category 1" },
      { id: 2, description: "Product 2", amount: 20, category: "Category 2" },
    ];

    const mockOnEditExpense = jest.fn();
    const mockOnDeleteExpense = jest.fn();
    const mockGetSanitizedEmail = jest.fn();

    render(
      <Provider
        store={mockStore({
          expense: {
            products: products,
          },
        })}
      >
        <ExpenseList
          onEditExpense={mockOnEditExpense}
          onDeleteExpense={mockOnDeleteExpense}
          getSanitizedEmail={mockGetSanitizedEmail}
        />
      </Provider>
    );

    // Check if the expense list is rendered correctly
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Category 1")).toBeInTheDocument();

    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("Category 2")).toBeInTheDocument();
  });

  test("calls onEditExpense when Edit button is clicked", async() => {
    const products = [
      { id: 1, description: "Product 1", amount: 10, category: "Category 1" },
    ];

    const mockOnEditExpense = jest.fn();
    const mockOnDeleteExpense = jest.fn();
    const mockGetSanitizedEmail = jest.fn();

    render(
      <Provider
        store={mockStore({
          expense: {
            products: products,
          },
        })}
      >
        <ExpenseList
          onEditExpense={mockOnEditExpense}
          onDeleteExpense={mockOnDeleteExpense}
          getSanitizedEmail={mockGetSanitizedEmail}
        />
      </Provider>
    );
// Setup user event
    userEvent.setup();
    // Click the Edit button
    await act(async()=>{
        await userEvent.click(screen.getByText("Edit"));
    })
    

    // Check if onEditExpense is called with the correct arguments
    expect(mockOnEditExpense).toHaveBeenCalledWith(products[0]);
  });

  test("calls onDeleteExpense when Delete button is clicked", async () => {
    const products = [
      { id: 1, description: "Product 1", amount: 10, category: "Category 1", _id: "1" },
    ];

    const mockOnEditExpense = jest.fn();
    const mockOnDeleteExpense = jest.fn();
    const mockGetSanitizedEmail = jest.fn(() => 'test@example.com');

    render(
      <Provider
        store={mockStore({
          expense: {
            products: products,
          },
        })}
      >
        <ExpenseList
          onEditExpense={mockOnEditExpense}
          onDeleteExpense={mockOnDeleteExpense}
          getSanitizedEmail={mockGetSanitizedEmail}
        />
      </Provider>
    );
    userEvent.setup();
    // Click the Delete button
    await act(async()=>{
        await userEvent.click(screen.getByText("Delete"));
    })

    // Check if onDeleteExpense is called with the correct arguments
    await waitFor(()=>{
        expect(mockOnDeleteExpense).toHaveBeenCalledWith("1", 'test@example.com');
    }) 
  });
});
