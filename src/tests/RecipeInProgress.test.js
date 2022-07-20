import React from 'react'
import renderWithRouter from './helpers/renderWithRouter'
import App from '../App'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('', () => {
  test('', async () => {
    renderWithRouter(<App />, ['/foods/53060/in-progress'])

    const shareBtn = await screen.findByRole('button', {
      name: /share/i
    })
    const favBtn = screen.getByRole('button', {
      name: /favorite/i
    })
    const finishBtn = screen.getByRole('button', {
      name: /finish recipe/i
    })

    expect(shareBtn).toBeInTheDocument()
    expect(favBtn).toBeInTheDocument()
    expect(finishBtn).toBeDisabled()

    const checkOne = screen.getByRole('checkbox', {
      name: /filo pastry \- 1 packet/i
    })
    const checkTwo = screen.getByRole('checkbox', {
      name: /minced beef \- 150g/i
    })
    const checkThree = screen.getByRole('checkbox', {
      name: /onion \- 150g/i
    })
    const checkFour = screen.getByRole('checkbox', {
      name: /oil \- 40g/i
    })
    const checkFive = screen.getByRole('checkbox', {
      name: /salt \- dash/i
    })
    const checkSix = screen.getByRole('checkbox', {
      name: /pepper \- dash/i
    })

    userEvent.click(checkOne)
    userEvent.click(checkTwo)
    userEvent.click(checkThree)
    userEvent.click(checkFour)
    userEvent.click(checkFive)
    userEvent.click(checkSix)

    expect(finishBtn).not.toBeDisabled()

    userEvent.click(checkFour)

    expect(finishBtn).toBeDisabled()
  })
})