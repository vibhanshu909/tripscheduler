export const submitForm = () => {
  //* The .as function creates an alias for the selected element
  cy.get('main main form').as('form').should('exist')

  //* getting the element by alias
  cy.get('@form')
    //* getting all the input groups
    .get('div[class*="FormGroup"]')
    .as('inputs')

  cy.get('@inputs')
    //* the .eq(0) function gets the 0th element from an array of elements
    .eq(0)
    //* .within function scopes cypress within that element.
    .within(() => {
      cy.get('div.Dropdown-root')
        .click()
        .get('div.Dropdown-option')
        .as('ddo')
        .then((countries) => {
          const len = countries.length
          return countries[Math.floor((Math.random() * 10 * len) % len)]
        })
        .click()
    })

  cy.get('@inputs')
    .eq(1)
    .within(() => {
      cy.get('div[class*="FormInnerGroup"]').as('dates')
      cy.get('@dates').eq(0).click().type('{enter}')
      cy.get('@dates').eq(1).click().type('{enter}')
    })

  cy.get('@inputs')
    .eq(2)
    .within(() => {
      cy.get('input')
        .as('input')
        .then((inputs) => {
          const len = inputs.length
          for (let i = 0; i < len; i++) {
            cy.get('@input').eq(i).type('0')
          }
        })
    })

  cy.get('@inputs')
    .eq(3)
    .within(() => {
      cy.get('input')
        .as('input')
        .then((inputs) => {
          const len = inputs.length
          cy.get('@input')
            .eq(Math.floor((Math.random() * 10 * len) % len))
            .parent()
            .click()
        })
    })

  cy.get('@form').submit()
  cy.get('body').type('{esc}')
}
