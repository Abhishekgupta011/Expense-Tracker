import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Importing and mocking useDispatch hook
import { useDispatch } from 'react-redux'; // Importing useDispatch
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(), // Mocking useDispatch
}));
// Mocking useNavigate hook
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn(),
}));

describe('Navbar Component', () => {
  const mockStore = configureStore([]);
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  test('renders Navbar component correctly', () => {
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    expect(screen.getByText('EasyExpense')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
  });

  test('calls logoutHandler when Logout button is clicked', async () => {
    const dispatchMock = jest.fn();
    const navigateMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock); // Mocking useDispatch
    useNavigate.mockReturnValue(navigateMock);

    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    userEvent.click(screen.getByRole('button', { name: 'Logout' }));

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith({ type: 'auth/logout' });
      expect(navigateMock).toHaveBeenCalledTimes(1);
      expect(navigateMock).toHaveBeenCalledWith('/');
    });
  });
});
