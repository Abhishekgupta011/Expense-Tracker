import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import SignUp from "./Signup";
import { Provider } from "react-redux";
import store from "../Store/Store";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { configureStore } from "@reduxjs/toolkit";

// Import your authSlice and create a mock store with it
import authReducer, { authActions } from "../Store/AuthSlice";

// Create a mock store
const store = configureStore({
  reducer: {
    auth: authReducer, // Set the reducer to your authSlice
  },
});

describe('SignUp Component', () => {
    test('renders SignUp component correctly', () => {
        render(
            <Provider store={store}>
                <SignUp />
            </Provider>
        );

        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        // Add more assertions as needed
    });

//   test('handles user input', async() => {
//     render(
//         <Provider store={store}>
//         <Router>
//             <SignUp />
//         </Router>
//         </Provider>
//     );

//     // Mock user input
//     await act(async()=>{
//       await userEvent.type(screen.getByLabelText(/Email/i), 'test@example.com' );
//       await userEvent.type(screen.getByLabelText(/Password/i),  'testpassword' );
//       await userEvent.type(screen.getByLabelText(/Confirm Password/i), 'testpassword');
//     })
    

//     // Check if the input values are updated
//     expect(screen.getByLabelText(/Email/i)).toHaveValue('test@example.com');
//     expect(screen.getByLabelText(/Password/i)).toHaveValue('testpassword');
//     expect(screen.getByLabelText(/Confirm Password/i)).toHaveValue('testpassword');
//   });

// //   test('handles form submission', async () => {
// //     render(
// //         <Provider store={store}>
// //             <Router>
// //                 <SignUp />
// //             </Router>
// //         </Provider>
      
// //     );

// //     // Mock user input
// //     userEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
// //     userEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'testpassword' } });
// //     userEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'testpassword' } });

// //     // Mock the fetch response
// //     global.fetch.mockResolvedValueOnce({
// //       json: () => Promise.resolve({ idToken: 'mockToken' }),
// //       ok: true,
// //     });
    
// //     // Submit the form
// //      userEvent.click(screen.getByText('Login'));
// //      await waitFor(() =>{
// //      expect(screen.getByText('Welcome to Expense Tracker')).toBeInTheDocument();
// //      });
//     // // Wait for the fetch call to be completed
//     // await waitFor(() => expect(global.fetch).toHaveBeenCalled());

//     // // Check if the component transitions to the next state (e.g., Layout component)
//     // expect(screen.getByText('Welcome to Expense Tracker')).toBeInTheDocument();
//   //});

//   test('toggles password visibility', async() => {
//     render(
//         <Provider store={store}>
//             <Router>
//                 <SignUp />
//             </Router>
//         </Provider>
      
//     );

//     // Initially, the password input should be of type "password"
//     expect(screen.getByRole(/Password/i).type).toBe('password');

//     // Click on the visibility icon to toggle password visibility
//     userEvent.click(screen.getByTestId('icon'));
//     await waitFor(()=>{
//      // After clicking, the password input should be of type "text"
//      expect(screen.getByLabelText(/Password/i).type).toBe('text');
//     })
    
//   });

//   test('handles toggling between Login and Sign-Up', async () => {
//     render(
//         <Provider store={store}>
//             <Router>
//                 <SignUp />
//             </Router>
//         </Provider>
//     );

//     // The initial state is Login
//     expect(screen.getByText('Create New Account? Sign Up')).toBeInTheDocument();

//     // Click on the toggle button to switch to Sign-Up
//     userEvent.click(screen.getByText('Create New Account? Sign Up'));
//     await waitFor(()=>{
//         // After clicking, the text should change to "Have an account? Login"
//         expect(screen.getByText('Have an account? Login')).toBeInTheDocument();
//     })
   
//   });
 });
