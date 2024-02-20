import React from 'react';
import { render, waitFor, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from './Signup';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import store from '../Store/Store';
import { userEvent } from '@testing-library/user-event';
describe('SignUp component', () => {
 
  test('renders email and password input fields', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );
    
    const emailInput = screen.getByPlaceholderText('User Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  }); 




  test('handles user input', async() => {
    render(
        <Provider store={store}>
        <BrowserRouter>
            <SignUp />
        </BrowserRouter>
        </Provider>
    );

    // Mock user input
    await act(async()=>{
      await userEvent.type(screen.getByLabelText(/Email/i), 'test@example.com' );
      await userEvent.type(screen.getByLabelText(/Password/i),  'testpassword' );
      //await userEvent.type(screen.getByLabelText(/Confirm Password/i), 'testpassword');
    })
    

    // Check if the input values are updated
    expect(screen.getByLabelText(/Email/i)).toHaveValue('test@example.com');
    expect(screen.getByLabelText(/Password/i)).toHaveValue('testpassword');
    //expect(screen.getByLabelText(/Confirm Password/i)).toHaveValue('testpassword');
    expect(screen.getByText('Login')).toBeInTheDocument();

  });

  
  test('handles form submission', async () => {


    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>  
    );
     expect(screen.getByText('Create New Account? Sign Up')).toBeInTheDocument();
      // await act(async()=>{
      //   await userEvent.click(screen.getByText('Create New Account? Sign Up'))
      //    //store.dispatch(authActions.setIsLogin(false))
      // })
    
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
   // expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument()
    // Mock user input
    await act(async()=>{
      await userEvent.type(screen.getByLabelText(/Email/i),'test@example.com' );
      await userEvent.type(screen.getByLabelText('Password'), 'testpassword' );
      //await userEvent.type(screen.getByLabelText(/Confirm Password/i), 'testpassword');
    })

    
    // Mock the fetch response
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({ idToken: 'mockToken' }),
      ok: true,
    });
    
    // Submit the form
     userEvent.click(screen.getByText('Login'));
     await waitFor(() =>{
     expect(screen.getByText('Welcome to Expense Tracker')).toBeInTheDocument();
     });
    // // Wait for the fetch call to be completed
    // await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    // // Check if the component transitions to the next state (e.g., Layout component)
    // expect(screen.getByText('Welcome to Expense Tracker')).toBeInTheDocument();
  });

 });
