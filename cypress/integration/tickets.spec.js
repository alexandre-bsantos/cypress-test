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

    it("Select Friend and Social Media, then uncheck Friend", () => {
        cy.get('#friend').check()
        cy.get('#social-media').check()
        cy.get('#friend').uncheck()
    })

    it("has 'TICKETBOX' header's heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX");
    })

    it("alerts invalid email", () => {
        cy.get('#email')
        .as('email')
        .type('teste-gmail.com');

        cy.get('#email.invalid')
        .should('exist');

        cy.get("@email")
            .clear()
            .type('teste@gmail.com');

        cy.get('#email.invalid')
        .should('not.exist');
    })

    it("fills and reset the form", () => {
        const firstName = 'Alexandre';
        const lastName = 'Santos';
        const fullName = `${firstName} ${lastName}`;

        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type('teste@gmail.com');
        cy.get('#ticket-quantity').select("2");
        cy.get('#vip').check();
        cy.get('#friend').check();
        cy.get('#social-media').check();
        cy.get('#requests').type('Teste');
        cy.get('.agreement p').should(
            'contain',
            `I, ${fullName}, wish to buy 2 VIP tickets.`
        );

        cy.get('#agree').check()

        cy.get('#signature').type(`${fullName}`)

        cy.get('[type="submit"]')
        .as('submitButton')
        .should('not.disabled')

        cy.get('[type="reset"]').click();

        cy.get('@submitButton').should('be.disabled')
    })

    it("fills mandatory fields using support command", () => {
        const customer = {
            firstName: "John",
            lastName: "Cena",
            email: "johncena@gmail.com"
        };

        cy.fillMandatoryFields(customer);

        cy.get('button[type="submit"]')
        .as('submitButton')
        .should('not.disabled')

        cy.get('#agree').uncheck()

        cy.get('@submitButton').should('be.disabled')

    })
})