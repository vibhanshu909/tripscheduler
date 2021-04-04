import { submitForm } from '../../support/submitForm'

describe('Edit Trip', () => {
  beforeEach(() => {
    cy.visit('/')

    cy.intercept('https://task-devel.cleevio-vercel.vercel.app/api/trip/O90PPngrFSwe5j4DXcni', {
      fixture: 'trip.json',
    })
    cy.intercept('https://task-devel.cleevio-vercel.vercel.app/api/trip', { fixture: 'trips.json' })

    cy.get('main main section div[class*="TripRow__ActionButtons"] a:first').click()
    cy.location('pathname', { timeout: 10000 }).should('include', '/editTrip')
  })
  it('submit form', () => {
    submitForm()
  })
})

export {}
