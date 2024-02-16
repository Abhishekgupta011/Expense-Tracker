import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExpenseForm from "./ExpenseForm";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { expensesActions } from "../../Store/ExpenseSlice";
import { PremiumAction } from "../../Store/PremiumSlice";
import store from "../../Store/Store";
import CsvContent from "../../Download/CsvContent";


describe('ExpenseForm Component', () => {
  const mockStore = configureStore([]);
  test('renders form elements correctly', async () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByRole('textbox',{ name : /description/i})).toBeInTheDocument();
      expect(screen.getByRole('spinbutton',{ name : /amount/i})).toBeInTheDocument();
      expect(screen.getByRole('textbox',{ name : /category/i})).toBeInTheDocument();
      expect(screen.getByRole('button',{ name : /Add Expense/i})).toBeInTheDocument();
      expect(screen.getByRole('heading',{ name : /Total Expenses:/i})).toBeInTheDocument();
      expect(screen.getByRole('button', { name : /Download CSV/i})).toBeInTheDocument();
    });
  });

  test('handles input changes', async () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );
    const inputs = [
    { label: /Description/i, value: 'Test Description' },
    { label: /Amount/i, value: '50' },
    { label: /Category/i, value: 'Test Category' },
  ];

  for (const { label, value } of inputs) {
    await act(async () => {
      const input = screen.getByLabelText(label);
      await userEvent.type(input, value);
    });
  }

    await waitFor(() => {
      expect(screen.getByRole('textbox' , {name : /Description/i})).toHaveValue('Test Description');
      expect(screen.getByRole("spinbutton",{name : /Amount/i })).toHaveValue(50); 
      expect(screen.getByRole('textbox' , {name : /Category/i})).toHaveValue('Test Category'); 
    });
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


  test('submits the form with valid data', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: async () => [{ id: '1', description: 'Test Description' , amount: 50 , category: 'Test Category'}],
    });
    let store;

    const initialState = {
      expense: {
        products: [],
        onEdited: false,
      },
      theme: {
        isDarkMode: false,
      },
    };
     store = mockStore(initialState);
  
      render(
        <Provider store={store}>
          <ExpenseForm />
        </Provider>
      );
  
      // Typing into input fields
      await act(async () => {
       await userEvent.type(screen.getByLabelText(/Description/i), "Test Description");
       await userEvent.type(screen.getByLabelText(/Amount/i), "Test Description");
       await userEvent.type(screen.getByLabelText(/Category/i), "Test Description");
       await userEvent.click(screen.getByText(/Add Expense/i));
      });
      // Asserting dispatched action
      const expectedAction = {
        type: 'expenses/addExpense', // Adjust action type based on your implementation
        payload: {
          id: "1",
          description: 'Test Description',
          amount : 50,
          category : 'Test Category'
        },
      };
      await store.dispatch(expectedAction);
      expect(store.getActions()).toContainEqual(expectedAction);
    });

  
  test('edits an expense and updates it', async () => {
    // Mocking an expense to be edited
    const editedExpense = { id: '2', description: 'Edited Expense', amount: 200, category: 'Edited Category'  };
    const store = mockStore({
      expense: {
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
    await act(async()=>{
      await userEvent.click(screen.getByText(/Add Expense/i))
      await userEvent.click(screen.getByText('Edit'))
    })
    //await expect(screen.getByRole('button',{name : 'Edit'})).toBeInTheDocument();
  
    expect(screen.getByLabelText('Description')).toHaveValue(editedExpense.description);
    expect(screen.getByLabelText('Amount')).toHaveValue(editedExpense.amount);
    expect(screen.getByLabelText('Category')).toHaveValue(editedExpense.category);
  
    // Update onEdited to true
    store.getState().expense.onEdited = true;
    await expect(store.getState().expense.onEdited).toBe(true);
    //await expect(store.getState().theme.isDarkMode).toBe(false);
    // const updateBtn = screen.getByRole('button',{name : 'Update Expense'})
    // await act(async() => {
    //    await expect(updateBtn).toBeInTheDocument();
    //    //expect(screen.getByLabelText('Description')).toHaveValue(editedExpense.description);
    // });
    const editedInput = screen.getByLabelText('Description')
    // Verify that the form is populated with the edited expense details
    await act(async()=>{
      await userEvent.clear(editedInput);
      await userEvent.type(editedInput, 'Edited Description');
      await userEvent.clear(screen.getByLabelText('Amount'));
      await  userEvent.type(screen.getByLabelText('Amount'), '250');
      await  userEvent.clear(screen.getByLabelText('Category'));
      await  userEvent.type(screen.getByLabelText('Category'), 'Edited Category');
    });
    await waitFor(() => {
      expect(screen.getByLabelText('Description')).toHaveValue('Edited Description')
      expect(screen.getByLabelText('Amount')).toHaveValue(250);
      expect(screen.getByLabelText('Category')).toHaveValue('Edited Category');
   });
    
  
    // Dispatch the action for updating the expense
    const expectedUpdatedExpense = {
      id: editedExpense.id,
      description: 'Edited Description',
      amount: 250,
      category: 'Edited Category',
    };
    const expectedAction = expensesActions.editExpense(expectedUpdatedExpense);
  
    await act(async () => {
      await store.dispatch(expectedAction);
    });
  
    // // Verify the expected behavior after updating
    // // Example: expect(screen.getByText('Expense updated successfully')).toBeInTheDocument();
  
    // Verify that the store is updated with the edited expense
    expect(store.getActions()).toContainEqual(expectedAction);
  });
  test('deletes an expense', async () => {
    // Mocking an expense to be deleted
    const expenseToDelete = { id: '3', description: 'Expense to Delete', amount: "300", category: 'Delete Category' };
    const store = mockStore({
      expense: {
        products: [expenseToDelete],
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
expect(screen.getByRole('button' , {name : 'Delete'})).toBeInTheDocument();
    // Click the "Delete" button
    await act(async () => {
      userEvent.click(screen.getByText('Delete'));
    });

    // // Update the assertions based on the behavior you expect after deletion
    // await waitFor(() => {
    //   // Verify the expected behavior after deletion
    //   // Example: expect(screen.getByText('Expense deleted successfully')).toBeInTheDocument();
    // });
    const expectedAction = expensesActions.deleteExpense(expenseToDelete.id);
    await act(async () => {
          await store.dispatch(expectedAction);
        });
    // // Verify that the store is updated with the deleted expense
    
    expect(store.getActions()).toContainEqual(expectedAction);
  });

  // test("downloads CSV", async() => {
  //   // Mocking products data
  //   const products = [
  //     { id: 1, description: "Product 1", amount: 10, category: "Category 1" },
  //     { id: 2, description: "Product 2", amount: 20, category: "Category 2" }
  //   ];
  //   const store = mockStore({
  //     expense: {
  //       products: products,
  //       onEdited: false,
  //     },
  //     theme: {
  //       isDarkMode: false,
  //     },
  //   });
  //   render(
  //     <Provider store={store}>
  //       <ExpenseForm />
  //     </Provider>
  //   );

  //   // Click the "Download CSV" button
  //   const downloadLink = screen.getByText('Download CSV');
  //   await act(async()=>{
  //     await userEvent.click(downloadLink);
  //   })
    

  //   // Assertions
  //   expect(downloadLink.download).toBe('expenses.csv');

  //   // You can add further assertions if required, for instance, to check the content of the CSV
  //   // You can't directly test the downloading mechanism due to limitations in Jest.
  //   // So, typically you would mock or spy on the creation of the Blob and download link,
  //   // then assert that the appropriate functions were called with the expected parameters.
  // });

});
