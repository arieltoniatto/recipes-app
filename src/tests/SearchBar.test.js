import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'
import renderWithRouter from './helpers/renderWithRouter';
import mockFetch from './Mocks/fetchMock';
// import dataMeals from './Mocks/data/datafetch'
import { act } from 'react-dom/test-utils'
// import { meals } from '../../cypress/mocks/meals'
// import { drinks } from '../../cypress/mocks/drinks'
import meals from './Mocks/data/meals'
import drinks from './Mocks/data/drinks'

describe('testing search bar', () => {

    // beforeEach(() => {
    //     act(() => {
    //       mockFetch(meals)
    //     })
    // })
    // beforeEach(mockFetch);
      afterEach(() => jest.clearAllMocks());
  test('verify if the component is working properly', async () => {
    await act(async () => {
      renderWithRouter(<App />, ['/foods'])
    })
    
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
    await act(async () => {
      renderWithRouter(<App />, ['/foods'])
    })

    global.alert = jest.fn((msg) => msg);

    const searchBtnEl = screen.getByRole('button', {
      name: /search icon/i
    })

    userEvent.click(searchBtnEl)

    const btnEl = screen.getByTestId('exec-search-btn')
    const textInputEl = screen.getByTestId('search-input')
    const ingredientEl = screen.getByRole('radio', {
      name: /ingredient:/i
    })
    const firstLetterRadioEl = screen.getByTestId('first-letter-search-radio')

    userEvent.click(ingredientEl)
    userEvent.click(firstLetterRadioEl)
    userEvent.type(textInputEl, 'fu')
    userEvent.click(btnEl)

    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character')  

  } )
  test('test if finds one element in meals', async () => {
    mockFetch(meals)
    await act(async () => {
      renderWithRouter(<App />, ['/foods'])
    })


    const searchBtnEl = screen.getByRole('button', {
      name: /search icon/i
    })

    userEvent.click(searchBtnEl)

    const btnEl = screen.getByTestId('exec-search-btn')
    const textInputEl = screen.getByTestId('search-input')
    const nameRadioEl = screen.getByTestId('name-search-radio')

    userEvent.click(nameRadioEl)
    userEvent.type(textInputEl, 'Corba')
    userEvent.click(btnEl)

    await waitFor(() => {
      const oneEl = screen.findByRole('heading', { name: /corba/i, level: 4 });
      // expect(oneEl).toBeInTheDocument();
    }, { timeout: 3000 })

    
   

  })
  test('test if find one element in drinks', async () => {
    mockFetch(drinks)
    await act(async () => {
      renderWithRouter(<App />, ['/drinks'])
    })


    const searchBtnEl = screen.getByRole('button', {
      name: /search icon/i
    })

    userEvent.click(searchBtnEl)

    const btnEl = screen.getByTestId('exec-search-btn')
    const textInputEl = screen.getByTestId('search-input')
    const nameRadioEl = screen.getByTestId('name-search-radio')

    userEvent.click(nameRadioEl)
    userEvent.type(textInputEl, 'GG')
    userEvent.click(btnEl)

    await waitFor(() => {
      const oneEl = screen.findByRole('heading', { name: /gg/i, level: 4 });
      // expect(oneEl).toBeInTheDocument();
    }, { timeout: 3000 })
  })
});