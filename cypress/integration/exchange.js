const validateConversionIsBeingDone = ({
  originCurrency,
  originCurrencySymbol,
  destionationCurrency,
  destionationCurrencySymbol,
}) => {
    cy
      .get('#convert-currency-button')
      .click()

    cy
      .get('#conversion-results-container')
      .should('be.visible')

    cy
      .get('#conversion-result-from-value')
      .should('include.text', originCurrencySymbol)
      .should('include.text', originCurrency)

    cy
      .get('#conversion-result-to-value')
      .should('include.text', destionationCurrencySymbol)
      .should('include.text', destionationCurrency)

    cy
      .get('#conversion-result-conversion-to-destionation')
      .should('include.text', `1 ${originCurrency} = `)
      .should('include.text', destionationCurrency)

    cy
      .get('#conversion-result-conversion-to-origin')
      .should('include.text', `1 ${destionationCurrency} = `)
      .should('include.text', originCurrency)

    cy
      .get('#exchange-rate-history-chart')
      .should('be.visible')
};

describe('Currency Exchange', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Open the app and convert 1 EUR to USD', () => {
    cy.get('#currency-amount')
      .type('1234')
      .should('have.value', '1,234')

    validateConversionIsBeingDone({
      originCurrency: 'EUR',
      originCurrencySymbol: '€',
      destionationCurrency: 'USD',
      destionationCurrencySymbol: '$',
    })
  });

  it('Open the app and convert 1 USD to EUR ', () => {
    cy
      .get('#currency-amount')
      .type('1234')
      .should('have.value', '1,234')

    cy
      .get('#bidirectional-exchange-button')
      .click()

    validateConversionIsBeingDone({
      originCurrency: 'USD',
      originCurrencySymbol: '$',
      destionationCurrency: 'EUR',
      destionationCurrencySymbol: '€',
    });
  });

  it('Open the app and convert 1 USD to AUD ', () => {
    cy
      .get('#currency-amount')
      .type('1234')
      .should('have.value', '1,234')

    cy
      .get('#from-currency-value-input-select')
      .click()

    cy
      .get('li[data-value="USD"]')
      .click()

    cy
      .get('#to-currency-value-input-select')
      .click()

    cy
      .get('li[data-value="AUD"]')
      .click()

    validateConversionIsBeingDone({
      originCurrency: 'USD',
      originCurrencySymbol: '$',
      destionationCurrency: 'AUD',
      destionationCurrencySymbol: '$',
    });
  });


  it('Open the app and convert 1 EUR to USD', () => {
    cy.get('#currency-amount')
      .type('1234')
      .should('have.value', '1,234')

    cy
      .get('#convert-currency-button')
      .click()

    cy
      .get('#date-select-toggle-button')
      .click()

    cy
      .get('#date-select-datepicker')
      .should('be.visible')
  });
});
