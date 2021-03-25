import { submitForm } from 'support/submitForm'

describe('New Trip Page', () => {
  beforeEach(() => {
    cy.visit('/newTrip')
    cy.intercept('https://task-devel.cleevio-vercel.vercel.app/api/trip', { fixture: 'trips.json' })
  })
  it('submit form', () => {
    submitForm()
  })
})
export {}
