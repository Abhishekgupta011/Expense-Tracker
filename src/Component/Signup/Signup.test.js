import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import SignUp from "./Signup";
import { Provider } from "react-redux";
import store from "../Store/Store";
import userEvent from "@testing-library/user-event";



describe('SignUp Component', () => {
  test('renders the component', () => {
    render(
        <Provider store={store}>
        <Router>
            <SignUp />
        </Router>
        </Provider>
    );

    // Check if the component is rendered
    expect(screen.getByText('Track Your')).toBeInTheDocument();
  });

//   test('handles user input', () => {
//     render(
//       <Router>
//         <SignUp />
//       </Router>
//     );

//     // Mock user input
//     fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
//     fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'testpassword' } });
//     fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'testpassword' } });

//     // Check if the input values are updated
//     expect(screen.getByLabelText(/Email/i).value).toBe('test@example.com');
//     expect(screen.getByLabelText(/Password/i).value).toBe('testpassword');
//     expect(screen.getByLabelText(/Confirm Password/i).value).toBe('testpassword');
//   });

//   test('handles form submission', async () => {
//     render(
//         <Provider store={store}>
//             <Router>
//                 <SignUp />
//             </Router>
//         </Provider>
      
//     );

//     // Mock user input
//     userEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
//     userEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'testpassword' } });
//     userEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'testpassword' } });

//     // Mock the fetch response
//     global.fetch.mockResolvedValueOnce({
//       json: () => Promise.resolve({ idToken: 'mockToken' }),
//       ok: true,
//     });
    
//     // Submit the form
//      userEvent.click(screen.getByText('Login'));
//      await waitFor(() =>{
//      expect(screen.getByText('Welcome to Expense Tracker')).toBeInTheDocument();
//      });
    // // Wait for the fetch call to be completed
    // await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    // // Check if the component transitions to the next state (e.g., Layout component)
    // expect(screen.getByText('Welcome to Expense Tracker')).toBeInTheDocument();
  //});

  test('toggles password visibility', async() => {
    render(
        <Provider store={store}>
            <Router>
                <SignUp />
            </Router>
        </Provider>
      
    );

    // Initially, the password input should be of type "password"
    expect(screen.getByLabelText(/Password/i).type).toBe('password');

    // Click on the visibility icon to toggle password visibility
    userEvent.click(screen.getByTestId('icon'));
    await waitFor(()=>{
     // After clicking, the password input should be of type "text"
     expect(screen.getByLabelText(/Password/i).type).toBe('text');
    })
    
  });

  test('handles toggling between Login and Sign-Up', async () => {
    render(
        <Provider store={store}>
            <Router>
                <SignUp />
            </Router>
        </Provider>
    );

    // The initial state is Login
    expect(screen.getByText('Create New Account? Sign Up')).toBeInTheDocument();

    // Click on the toggle button to switch to Sign-Up
    userEvent.click(screen.getByText('Create New Account? Sign Up'));
    await waitFor(()=>{
        // After clicking, the text should change to "Have an account? Login"
        expect(screen.getByText('Have an account? Login')).toBeInTheDocument();
    })
   
  });
});
