import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from "./Layout";
import SignUp from "../Signup/Signup";

describe('Layout Component', () => {
  test('renders welcome message', () => {
    render(
    <Router>
        <Layout />
    </Router>);

    // Check if the welcome message is rendered
    expect(screen.getByText('Welcome to Expense Tracker')).toBeInTheDocument();
  });

  test('renders profile incomplete message with link', () => {
    render(
      <Router>
        <Layout />
      </Router>
    );

    // Check if the profile incomplete message is rendered
    expect(screen.getByText('Your profile is incomplete.')).toBeInTheDocument();

    // Check if the link to complete the profile is rendered
    const completeLink = screen.getByRole('link', { name: /complete now/i });
    expect(completeLink).toBeInTheDocument();

    // Simulate a user clicking the link
    // You can add assertions based on the expected behavior after the link is clicked
    // Example: expect(screen.getByText('Redirecting to profile page...')).toBeInTheDocument();
  });
});
