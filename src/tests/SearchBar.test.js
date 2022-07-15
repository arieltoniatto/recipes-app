import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'
import renderWithRouter from './helpers/renderWithRouter';
import mockFetch from './Mocks/fetchMock';
import dataMeals from './Mocks/data/datafetch'
import fetchFilter from '../services/fatchFilter'

describe('testing search bar', () => {

    // beforeEach(() => {
    //     // mockFetch(dataMeals)
    //     renderWithRouter(<App />, ['/foods'])
    // })
    // beforeEach(mockFetch);
    //   afterEach(() => jest.clearAllMocks());
  test('verify if the component is working properly', () => {
    renderWithRouter(<App />, ['/foods'])
    
    const searchBtnEl = screen.getByRole('button', {
      name: /search icon/i
    })

    userEvent.click(searchBtnEl)

    const btnEl = screen.getByTestId('exec-search-btn')
    const textInputEl = screen.getByTestId('search-input')
    const ingredientRadioEl = screen.getByTestId('ingredient-search-radio')
    const nameRadioEl = screen.getByTestId('name-search-radio')
    const firstLetterRadioEl = screen.getByTestId('first-letter-search-radio')

    userEvent.click(ingredientRadioEl)
    userEvent.click(nameRadioEl)
    userEvent.click(firstLetterRadioEl)
    userEvent.type(textInputEl, 'f')
    userEvent.click(btnEl)

  } )
  test('verify if a warning appears if more than one character is typed on First Letter Search', async () => {
    renderWithRouter(<App />, ['/foods'])

    // jest.spyOn(window, 'alert').mockImplementation()

    const searchBtnEl = screen.getByRole('button', {
      name: /search icon/i
    })

    userEvent.click(searchBtnEl)

    const btnEl = screen.getByTestId('exec-search-btn')
    const textInputEl = screen.getByTestId('search-input')
    const firstLetterRadioEl = screen.getByTestId('first-letter-search-radio')

    userEvent.click(firstLetterRadioEl)
    userEvent.type(textInputEl, 'fu')
    userEvent.click(btnEl)

    // const result = await fetchFilter('fu', 'first-letter', 'Foods')

    // expect(result).toEqual(new alert('Your search must have only 1 (one) character'))

  } )
});