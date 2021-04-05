import Trips from 'pages/index'
import React from 'react'
import { fireEvent, render } from '../testUtils'

describe('Trips page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Trips />, {})
    expect(asFragment()).toBeDefined()
  })

  it('clicking button triggers alert', () => {
    const { getByText } = render(<Trips />, {})
    window.alert = jest.fn()
    fireEvent.click(getByText('Test Button'))
    expect(window.alert).toHaveBeenCalledWith('With typescript and Jest')
  })
})
