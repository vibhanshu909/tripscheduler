// import { render } from '@testing-library/react'
import Anchor from 'components/Anchor'
import Home from 'pages/index'
import { Provider } from 'pages/_app'
import React from 'react'
import { render } from '../testUtils'

describe('Home page', () => {
  // it('matches snapshot', () => {
  //   const { asFragment } = render(<Home />, {})
  //   expect(asFragment()).toMatchSnapshot()
  // })

  it('Anchor', () => {
    const { getByText } = render(<Anchor href={'/'}>Link</Anchor>, { wrapper: Provider })
    expect(getByText('Link')).toBeDefined()
  })
  it('h1', () => {
    const { getByText } = render(<h1>Link</h1>)
    expect(getByText('Link')).toBeDefined()
  })
  it('List Trips', () => {
    const { getByText } = render(<Home />)
    // window.alert = jest.fn()
    // fireEvent.click(getByText('Test Button'))
    // expect(window.alert).toHaveBeenCalledWith('With typescript and Jest')
    expect(getByText('New Trip')).toBeDefined()
  })
})
