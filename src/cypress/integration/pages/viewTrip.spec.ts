describe('View Trip', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.intercept('https://task-devel.cleevio-vercel.vercel.app/api/trip/O90PPngrFSwe5j4DXcni', {
      fixture: 'trip.json',
    })
    cy.intercept('https://task-devel.cleevio-vercel.vercel.app/api/trip', {
      fixture: 'trips.json',
    })
  })
  it('view first trip', () => {
    cy.get('main main section a:first').click()
    cy.location('pathname', { timeout: 10000 }).should('include', '/viewTrip')
  })
})
export {}
