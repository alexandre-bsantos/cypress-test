describe("Tickets", () => {
    beforeEach(() => cy.visit('https://ticket-box.s3.eu-central-1.amazonaws.com/index.html'))

    it("Fills all the text input fields", () => {
        const firstName = 'Alexandre'
        const lastName = 'Santos'

        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.get('#email').type('alexandre_bsantos12@hotmail.com')
        cy.get('#requests').type('Teste')
        cy.get('#signature').type(`${firstName} ${lastName}`)
    });

    it("Select two tickets", () => {
        cy.get('#ticket-quantity').select("2");
    })

    it("Select VIP ticket type", () => {
        cy.get('#vip').check()
    })

    it.only("Select Friend and Social Media, then uncheck Friend", () => {
        cy.get('#friend').check()
        cy.get('#social-media').check()
        cy.get('#friend').uncheck()
    })

    it("has 'TICKETBOX' header's heading", () => {})
})