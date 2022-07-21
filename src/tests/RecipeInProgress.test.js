import React from 'react'
import renderWithRouter from './helpers/renderWithRouter'
import App from '../App'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import gigaMock from './Mocks/fetchMock'

const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      delete store[key];
    }
  };
})();
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});


describe('', () => {
  afterEach(() => {
    jest.resetAllMocks();
  })
  test('', async () => {
    gigaMock('themeal', '52771')
    renderWithRouter(<App />, ['/foods/52771/in-progress'])

   const ingred1 = await screen.findByRole('checkbox', {
    name: /penne rigate \- 1 pound/i })
   const ingred2 = await screen.findByRole('checkbox', {
    name:/olive oil \- 1\/4 cup/i })
   const ingred3 = await screen.findByRole('checkbox', {
    name: /garlic \- 3 cloves/i })
   const ingred4 = await screen.findByRole('checkbox', {
    name:/chopped tomatoes \- 1 tin/i })
   const ingred5 = await screen.findByRole('checkbox', {
    name:/red chile flakes \- 1\/2 teaspoon/i })
   const ingred6 = await screen.findByRole('checkbox', {
    name:/italian seasoning \- 1\/2 teaspoon/i })
   const ingred7 = await screen.findByRole('checkbox', {
    name:/basil \- 6 leaves/i })
   const ingred8 = await screen.findByRole('checkbox', {
    name:/parmigiano\-reggiano \- spinkling/i })

   const allingred = await screen.findAllByTestId(/ingredient-name-and-measure/i)

   expect(allingred.length).toBe(8)

   const finishBtn = await screen.findByRole('button', {
    name: /finish recipe/i
  })
   
   expect(finishBtn).toBeDisabled()

   userEvent.click(ingred1)
   userEvent.click(ingred2)
   userEvent.click(ingred3)
   userEvent.click(ingred4)
   userEvent.click(ingred5)
   userEvent.click(ingred6)
   userEvent.click(ingred7)
   userEvent.click(ingred8)

   expect(finishBtn).not.toBeDisabled()

   const imgEl = await screen.findByTestId('recipe-photo')
   expect(imgEl).toBeInTheDocument()
   expect(imgEl).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg')
   expect(imgEl).toHaveAttribute('alt', "Spicy Arrabiata Penne")

  })
})