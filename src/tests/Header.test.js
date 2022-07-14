import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'
import renderWithRouter from './helpers/renderWithRouter';

describe('test header component', () => {
  beforeEach(() => {
    renderWithRouter(<App />)
})
  test('verify where header should appear', () => {
    history.push('/foods')
    const headerEl = screen.getAllByTestId('page-title')
    expect(headerEl).toBeInTheDocument();

    history.push('/drinks')
    expect(headerEl).toBeInTheDocument();

    expect(headerEl).not.toBeInTheDocument();

    history.push('/foods/1')
    expect(headerEl).not.toBeInTheDocument();
    
    history.push('/drinks/1')
    expect(headerEl).not.toBeInTheDocument();

    history.push('/foods/1/in-progress')
    expect(headerEl).not.toBeInTheDocument();
    
    history.push('/drinks/1/in-progress')
    expect(headerEl).not.toBeInTheDocument();

  })
  test('', () => {
    const searchEl = screen.getByTestId("search-top-btn")
    history.push('/profile')

    const profileEl = screen.getByTestId("profile-top-btn")
    const profileTitle = screen.getAllByRole('link', { name: /^profile$/i })

    expect(profileEl).toBeInTheDocument();
    expect(profileTitle).toBeInTheDocument();
    expect(profileTitle).toHaveAttribute('href', '/profile')
    expect(searchEl).not.toBeInTheDocument();
  })
})