import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router, MemoryRouter } from 'react-router-dom';
import App from '../App'
import AppProvider from '../context/AppProvider';

describe('', () => {
  test('test login page', () => {
    render(
      <AppProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </AppProvider>
    )
    const emailInput = screen.getByTestId("email-input")
    expect(emailInput).toBeInTheDocument();
  })
})