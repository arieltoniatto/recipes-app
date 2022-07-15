import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'
import renderWithRouter from './helpers/renderWithRouter';

describe('test header component', () => {
  let globalHistory;

  beforeEach(() => {
   const { history } = renderWithRouter(<App />)
   globalHistory = history;
})

  test('verify where header should appear', () => {
    globalHistory.push('/foods')
    let headerEl = screen.getByTestId('page-title')
    const headerBtn = screen.getByTestId("search-top-btn")
    expect(globalHistory.location.pathname).toBe('/foods')
    expect(headerEl).toBeInTheDocument();

    userEvent.click(headerBtn)

    globalHistory.push('/drinks')

    
    expect(globalHistory.location.pathname).toBe('/drinks')
    headerEl = screen.getByTestId('page-title')
    expect(headerEl).toBeInTheDocument();

    globalHistory.push('/foods/1')
    headerEl = screen.queryByTestId('page-title')
    expect(headerEl).not.toBeInTheDocument();
    
    globalHistory.push('/drinks/1')
    headerEl = screen.queryByTestId('page-title')
    expect(headerEl).not.toBeInTheDocument();

    globalHistory.push('/foods/1/in-progress')
    headerEl = screen.queryByTestId('page-title')
    expect(headerEl).not.toBeInTheDocument();
    
    globalHistory.push('/drinks/1/in-progress')
    headerEl = screen.queryByTestId('page-title')
    expect(headerEl).not.toBeInTheDocument();

  })
  test('verify what should appear on the profile, done recipes and favorite recipes page', () => {
    globalHistory.push('/profile')

    let profileEl = screen.getByTestId("profile-top-btn");
    let profileName = screen.getByRole('heading', { name: /^profile$/i, level: 1 })
    let profileLink = screen.getByTestId('profile-top-btn')

    expect(profileEl).toBeInTheDocument();
    expect(profileName).toBeInTheDocument();
    expect(screen.queryByTestId("search-top-btn")).not.toBeInTheDocument();

    globalHistory.push('/done-recipes')
    profileEl = screen.getByTestId("profile-top-btn")
    profileLink = screen.getByTestId('profile-top-btn')

    const doneRecipesName = screen.getByRole('heading', { name: /^Done Recipes$/i, level: 1 })

    expect(profileEl).toBeInTheDocument();
    expect(doneRecipesName).toBeInTheDocument();
    expect(screen.queryByTestId("search-top-btn")).not.toBeInTheDocument();

    globalHistory.push('/favorite-recipes')
    profileEl = screen.getByTestId("profile-top-btn")
    profileLink = screen.getByTestId('profile-top-btn')

    const favRecipesName = screen.getByRole('heading', { name: /^Favorite Recipes$/i, level: 1 })

    expect(profileEl).toBeInTheDocument();
    expect(favRecipesName).toBeInTheDocument();
    expect(screen.queryByTestId("search-top-btn")).not.toBeInTheDocument();
  })
})