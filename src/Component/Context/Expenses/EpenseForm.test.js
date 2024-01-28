import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExpenseForm from "./ExpenseForm";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { expensesActions } from "../../Store/ExpenseSlice";
import { PremiumAction } from "../../Store/PremiumSlice";
import store from "../../Store/Store";
const mockStore = configureStore();

describe('ExpenseForm Component', () => {
  test('renders form elements correctly', async () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Description')).toBeInTheDocument();
      expect(screen.getByLabelText('Amount')).toBeInTheDocument();
      expect(screen.getByLabelText('Category')).toBeInTheDocument();
      expect(screen.getByText('Add Expense')).toBeInTheDocument();
      expect(screen.getByText('Total Expenses:', { exact: false })).toBeInTheDocument();
      expect(screen.getByText('Download CSV')).toBeInTheDocument();
    });
  });

  test('handles input changes', () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );

    act(() => {
      userEvent.type(screen.getByLabelText('Description'), 'Test Description');
      userEvent.type(screen.getByLabelText('Amount'), '50');
      userEvent.type(screen.getByLabelText('Category'), 'Test Category');
    });

    expect(screen.getByLabelText('Description')).toHaveValue('Test Description');
    expect(screen.getByLabelText('Amount')).toHaveValue(50);
    expect(screen.getByLabelText('Category')).toHaveValue('Test Category');
  });

  test('Switch to Light mode appears when the button was not clicked', async () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Switch to Light Mode')).toBeInTheDocument();
    });
  });

  test('renders Switch to Dark mode when the button is clicked', async () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );

    const switchButton = screen.getByText('Switch to Light Mode');
    userEvent.click(switchButton);

    // Wait for the appearance of the "Switch to Dark Mode" button
    await waitFor(() => {
      const darkModeButton = screen.queryByText('Switch to Dark Mode');
      expect(darkModeButton).toBeInTheDocument();
    });
  });

  test('activates premium when total expenses exceed 10000', () => {
    // Initial store state with total expenses below 10000
    const initialStore = {
      expense: {
        products: [
          { id: '1', description: 'Test Expense', amount: 5000, category: 'Test Category' },
        ],
        onEdited: false,
      },
      theme: {
        isDarkMode: true,
      },
      premium: {
        activated: false,
      },
    };

    // Create a mock store with the initial state
    const store = mockStore(initialStore);

    // Render the component with the initial store
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );

    // Check if "Activate Premium" button is not present initially
    expect(screen.queryByText('Activate Premium')).not.toBeInTheDocument();

    // Update the store to have total expenses above 10000
    const newTotalExpenses = 12000;
    const updatedStore = {
      ...initialStore,
      expense: {
        ...initialStore.expense,
        products: [
          { id: '1', description: 'Test Expense', amount: newTotalExpenses, category: 'Test Category' },
        ],
      },
      activatePremium: {
        activated : true,
      }
    };

    // Render the component again with the updated store
    render(
      <Provider store={mockStore(updatedStore)}>
        <ExpenseForm />
      </Provider>
    );

    // Check if "Activate Premium" button is present after updating total expenses
    expect(screen.getByText('Activate Premium')).toBeInTheDocument();

  });

  // test('submits the form with valid data', async () => {
  //   const store = mockStore({
  //     expenses: {
  //       products: [{ id: '1', description: 'Test Description', amount: 50, category: 'Test Category' },],
  //       total: 0,
  //       onEdited: false,
  //     },
  //     theme: {
  //       isDarkMode: false, // Provide the initial state for the theme slice
  //     },
  //   });
  //   render(
  //     <Provider store={store}>
  //       <ExpenseForm />
  //     </Provider>
  //   );

  //   act(() => {
  //     userEvent.type(screen.getByLabelText('Description'), 'Test Description');
  //     userEvent.type(screen.getByLabelText('Amount'), '50');
  //     userEvent.type(screen.getByLabelText('Category'), 'Test Category');
  //   });

  //   userEvent.click(screen.getByText('Add Expense'));

  //   // Update the assertions based on the behavior you expect after form submission
  //   await waitFor(() => {
  //     // Verify the expected behavior after form submission
  //     // Example: expect(screen.getByText('Expense added successfully')).toBeInTheDocument();
  //   });

  //   const expectedAction = expensesActions.addExpense({
  //     id: expect.any(String),
  //     description: 'Test Description',
  //     amount: 50,
  //     category: 'Test Category',
  //   });
  //   expect(store.getActions()).toContainEqual(expectedAction);
  // });

test('edits an expense and updates it', async () => {
  // Mocking an expense to be edited
  const editedExpense = { id: '2', description: 'Edited Expense', amount: 200, category: 'Edited Category' };
  const store = mockStore({
    expenses: {
      products: [editedExpense],
      onEdited: false,
    },
    theme: {
      isDarkMode: false,
    },
  });

  render(
    <Provider store={store}>
      <ExpenseForm />
    </Provider>
  );
    expect(screen.getByText('Edit')).toBeInTheDocument();
  // Verify that the form is populated with the edited expense details
  await waitFor(() => {
    expect(screen.getByLabelText('Description')).toHaveValue(editedExpense.description);
    expect(screen.getByLabelText('Amount')).toHaveValue(200);
    expect(screen.getByLabelText('Category')).toHaveValue(editedExpense.category);
  });

  // Make changes to the expense details
  act(() => {
    userEvent.type(screen.getByLabelText('Description'), 'Edited Description');
    userEvent.type(screen.getByLabelText('Amount'), '250');
    userEvent.type(screen.getByLabelText('Category'), 'Edited Category');
  });

  // Dispatch the action for updating the expense
  act(() => {
    store.dispatch(expectedAction.editExpense({
      id: editedExpense.id,
      description: 'Edited Description',
      amount: 250,
      category: 'Edited Category',
    }));
  });

  // Update the assertions based on the behavior you expect after updating
  await waitFor(() => {
    // Verify the expected behavior after updating
    // Example: expect(screen.getByText('Expense updated successfully')).toBeInTheDocument();
  });

  // Verify that the store is updated with the edited expense
  const expectedUpdatedExpense = {
    id: editedExpense.id,
    description: 'Edited Description',
    amount: 250,
    category: 'Edited Category',
  };
  const expectedAction = expensesActions.editExpense(expectedUpdatedExpense);

  // Check if the action was dispatched to the store
  //expect(store.getActions()).toContainEqual(expectedAction);
});

//   test('deletes an expense', async () => {
//     // Mocking an expense to be deleted
//     const expenseToDelete = { id: '3', description: 'Expense to Delete', amount: "300", category: 'Delete Category' };
//     store = mockStore({
//       expense: {
//         products: [expenseToDelete],
//         onEdited: false,
//       },
//       theme: {
//         isDarkMode: false,
//       },
//     });

//     render(
//       <Provider store={store}>
//         <ExpenseForm />
//       </Provider>
//     );

//     // Click the "Delete" button
//     userEvent.click(screen.getByText('Delete'));

//     // Update the assertions based on the behavior you expect after deletion
//     await waitFor(() => {
//       // Verify the expected behavior after deletion
//       // Example: expect(screen.getByText('Expense deleted successfully')).toBeInTheDocument();
//     });

//     // Verify that the store is updated with the deleted expense
//     const expectedAction = expensesActions.deleteExpense(expenseToDelete.id);
//     expect(store.getActions()).toContainEqual(expectedAction);
//   });

//   test('downloads CSV', () => {
//     render(
//       <Provider store={store}>
//         <ExpenseForm />
//       </Provider>
//     );

//     // Click the "Download CSV" button
//     userEvent.click(screen.getByText('Download CSV'));

//     // Update the assertions based on the behavior you expect after downloading CSV
//     // Example: Verify that the download link is created and clicked
//     // const downloadLink = screen.getByText('Download CSV');
//     // expect(downloadLink).toBeInTheDocument();
//     // expect(downloadLink.download).toBe('expenses.csv');
//   });

//   // Add more tests as needed to cover the entire functionality of your component
});
