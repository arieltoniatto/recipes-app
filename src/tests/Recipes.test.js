import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react'
import App from '../App'
import renderWithRouter from './helpers/renderWithRouter';
import goatMeals from './Mocks/data/goatMeals'
import drinks from './Mocks/data/drinks'
import ordinaryDrinks from './Mocks/data/ordinaryDrinks';
import newMeals from './Mocks/data/newMeals'
import {mockCategories, mockFetch} from './Mocks/fetchMock';
import { mealsCateg, drinksCateg } from './Mocks/data/newCategories';

describe('', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('', async () => {
    // mockFetch(newMeals);
    // mockCategories(mealsCateg)
    renderWithRouter(<App />, ['/foods'])

    const beefBtn = await screen.findByRole('button', {
      name: /beef/i
    })
    const breakfastBtn = await screen.findByRole('button', {
      name: /breakfast/i
    })
    const chickenBtn = await screen.findByRole('button', {
      name: /chicken/i
    })
    const dessertBtn = await screen.findByRole('button', {
      name: /dessert/i
    })
    const goatBtn = await screen.findByRole('button', {
      name: /goat/i
    })
    const allBtn = await screen.findByRole('button', {
      name: /all/i
    })
    userEvent.click(beefBtn)
    userEvent.click(breakfastBtn)
    userEvent.click(chickenBtn)
    userEvent.click(dessertBtn)
    userEvent.click(goatBtn)
    userEvent.click(allBtn)

    const cardEl = await screen.findAllByTestId(/recipe-card/i)
    const cardimgEl = await screen.findAllByTestId(/card-img/i)
    const cardnameEl = await screen.findAllByTestId(/card-name/i)

    expect(cardEl.length).toBe(12)
    expect(cardimgEl.length).toBe(12)
    expect(cardnameEl.length).toBe(12)
  })
  test('', async () => {
    mockFetch(ordinaryDrinks)
    mockCategories(drinksCateg)
    renderWithRouter(<App />, ['/drinks'])

    const ordinaryBtn = await screen.findByRole('button', {
      name: /ordinary drink/i
    })
    const cocktailBtn = await screen.findByRole('button', {
      name: /cocktail/i
    })
    const shakeBtn = await screen.findByRole('button', {
      name: /shake/i
    })
    const otherBtn = await screen.findByRole('button', {
      name: /other\/unknown/i
    })
    const cocoaBtn = await screen.findByRole('button', {
      name: /cocoa/i
    })
    const allBtn = await screen.findByRole('button', {
      name: /all/i
    })

    userEvent.click(ordinaryBtn)
    userEvent.click(cocktailBtn)
    userEvent.click(shakeBtn)
    userEvent.click(otherBtn)
    userEvent.click(cocoaBtn)
    userEvent.click(allBtn)

    const cardContainer = await screen.findByTestId('4-recipe-card')
    expect(cardContainer).toBeInTheDocument()
  })
})