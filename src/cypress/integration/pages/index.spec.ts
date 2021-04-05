describe('Index Page', () => {
  beforeEach(() => {
    cy.visit('/')

    //* this method helps to mock the backend api, so the tests are reproducible
    cy.intercept('https://task-devel.cleevio-vercel.vercel.app/api/trip', { fixture: 'trips.json' })
  })
  it('check trips', () => {
    cy
      //* the `get` method is used to get a list of elements from the `DOM`.
      .get('nav ul a')

      //* the `contains` method checks a string inside the list of elements returned by `get`
      .contains('new trip', {
        //* this flag is used to ignore the case of the text, so both uppercase and lowercase letters will be matched.
        matchCase: false,
      })

      //* the `should` method provides a lot of helpers to make assertion like `have.length` which is used to test the length of the list of elements.
      .should('have.length', 1)

    cy.get('main main h1').contains('Your trips', { matchCase: false })
    cy.get('main main section').should('not.be.empty')
  })
  it('navigate to new trip', () => {
    cy.get('nav ul a').contains('new trip', { matchCase: false }).should('have.length', 1).click()

    cy
      //* this method gets the url path for the current page
      .location('pathname', { timeout: 10000 })
      .should('include', '/newTrip')
  })
})

export {}
