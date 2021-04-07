import { submitForm } from '../../support/submitForm'

describe('Edit Trip', () => {
  beforeEach(() => {
    cy.visit('/')

    //* this method helps to mock the backend api, so the tests are reproducible
    cy.intercept('https://task-devel.cleevio-vercel.vercel.app/api/trip/O90PPngrFSwe5j4DXcni', {
      //* fixture will refer to the files inside the `fixtures` directory
      fixture: 'trip.json',
    })
    cy.intercept('https://task-devel.cleevio-vercel.vercel.app/api/trip', { fixture: 'trips.json' })

    cy.get('main main section div[class*="TripRow__ActionButtons"] a:first').click()

    cy
      //* this method gets the url path for the current page
      .location('pathname', { timeout: 10000 })

      //* the `should` method provides a lot of helpers to make assertion like `include` which is used to test the presence of a perticular string.
      .should('include', '/editTrip')
  })
  it('submit form', () => {
    submitForm()
  })
})

export {}
