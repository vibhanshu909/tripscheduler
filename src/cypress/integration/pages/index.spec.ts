describe('Index Page', () => {
  beforeEach(() => {
    cy.visit('/')
    //* this method helps to mock the backend api, so the tests are reproducible
    cy.intercept('https://task-devel.cleevio-vercel.vercel.app/api/trip', { fixture: 'trips.json' })
  })
  it('check trips', () => {
    cy.get('nav ul a').contains('new trip', { matchCase: false }).should('have.length', 1)
    cy.get('main main h1').contains('Your trips', { matchCase: false })
    cy.get('main main section').should('not.be.empty')
  })
  it('navigate to new trip', () => {
    cy.get('nav ul a').contains('new trip', { matchCase: false }).should('have.length', 1).click()
    cy.location('pathname', { timeout: 10000 }).should('include', '/newTrip')
  })
})

export {}
