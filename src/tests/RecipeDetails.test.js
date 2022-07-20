import React from 'react'
import renderWithRouter from './helpers/renderWithRouter'
import App from '../App'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('testing recipe details', () => {
  test('verify if the start recipe button is working propperl', async () => {
    const { history } = renderWithRouter(<App />, ['/foods/52977'])

    const titileEl = await screen.findByRole('heading', {
      name: /corba/i, level: 1
    })
    const imgEl = await screen.findByTestId('recipe-photo')
    const categEl = await screen.findByTestId('recipe-category')
    const ingredAndMeasureEl = await screen.findAllByTestId(/ingredient-name-and-measure/i)
    const videoEl = screen.getByTitle(/youtube video player/i)

    expect(videoEl).toBeInTheDocument()
    expect(titileEl).toBeInTheDocument()
    expect(imgEl).toBeInTheDocument()
    expect(categEl).toBeInTheDocument()
    expect(ingredAndMeasureEl.length).toBe(13)

    const recomendationsEls = await screen.findAllByTestId(/recomendation-card/i)
    const recomendationsTitleEl = await screen.findAllByTestId(/recomendation-title/i)

    expect(recomendationsEls.length).toBe(6)
    expect(recomendationsTitleEl.length).toBe(6)

    const startRecipeBtn = await screen.findByRole('button', {
      name: /start recipe/i
    })
    userEvent.click(startRecipeBtn)
    expect(history.location.pathname).toBe('/foods/52977/in-progress')

  })
  test('', async () => {
    const { history } = renderWithRouter(<App />, ['/drinks/17222'])

    const recipeCateg = await screen.findByText(/alcoholic/i)
    const ingredAndMeasureEl = await screen.findAllByTestId(/ingredient-name-and-measure/i)
    const videoEl = screen.queryByTitle(/youtube video player/i)

    expect(videoEl).not.toBeInTheDocument()
    expect(ingredAndMeasureEl.length).toBe(4)
    expect(recipeCateg).toBeInTheDocument()

    const recomendationsEls = await screen.findAllByTestId(/recomendation-card/i)
    const recomendationsTitleEl = await screen.findAllByTestId(/recomendation-title/i)

    expect(recomendationsEls.length).toBe(6)
    expect(recomendationsTitleEl.length).toBe(6)

    const startRecipeBtn = await screen.findByRole('button', {
      name: /start recipe/i
    })
    userEvent.click(startRecipeBtn)
    expect(history.location.pathname).toBe('/drinks/17222/in-progress')
  })
  test('verify if the start recipe button doesnt appear after youve done the recipe', () => {
    const newRecipesFinish = [{
      id: "52978",
    }]
    global.localStorage.setItem('doneRecipes', JSON.stringify(newRecipesFinish))
    renderWithRouter(<App />, ['/foods/52978'])

    const startRecipeBtn = screen.queryByRole('button', {
      name: /start recipe/i
    })

    expect(startRecipeBtn).not.toBeInTheDocument()
  })
  test('', async () => {
    global.localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: {}, meals: { 53026: [] }}))
    renderWithRouter(<App />, ['/foods/53026'])

    const continueRecipeBtn = await screen.findByRole('button', { name: /Continue Recipe/i}, {timeout: 3000})

    expect(continueRecipeBtn).toBeInTheDocument()
  })
})