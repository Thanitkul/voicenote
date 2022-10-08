describe('Visit Signup', () => {
    it('should see', () => {
        cy.viewport(400, 750)
        cy.visit('http://localhost:4200');
        cy.get('[data-testid=link-signup]').click();
        cy.url().should('include', '/authentication/signup');

        cy.get('[data-testid=header-create-an]').should('have.text', 'Create an');
        cy.get('[data-testid=header-account]').should('have.text', 'Account');
        cy.get('[placeholder=Username]').should('exist');
        cy.get('[placeholder=Email]').should('exist');
        cy.get('[placeholder=Password]').should('exist');
        cy.get('[placeholder="DD/MM/YY"]').should('exist');
        cy.get('button').should('have.text', 'Sign Up');
        cy.contains('By clicking Sign up you agree to our Terms and Conditions and Privacy Statement');
        cy.contains('Already have an account? Sign In');
    });

    describe('Act sign-up', () => {
        it('sign-up success', () => {
            cy.viewport(400, 750)
            cy.intercept('POST', 'https://newtonian-voicenote.fly.dev/api/auth/signup', {
                statusCode: 200,
                body: {
                    message: 'Success'
                }
            });

            cy.visit('http://localhost:4200/authentication/signup');
            cy.wait(1000)
            cy.get('[placeholder=Username]').type('test');
            cy.wait(1000)
            cy.get('[placeholder=Email]').type('test@gmail.com');
            cy.wait(1000)
            cy.get('[placeholder=Password]').type('12345678');
            cy.wait(1000)
            cy.get('[placeholder="DD/MM/YY"]').type('2022-09-29');
            cy.wait(1000)
            cy.get('button').click();

            cy.url().should('not.include', '/authentication/signup')
        });

        it('should display username cannot be blank', () => {
            cy.viewport(400, 750)
            cy.visit('http://localhost:4200/authentication/signup');
            cy.wait(1000)
            cy.get('button').click();
            cy.wait(1000)
            cy.contains('Username cannot be blank')
            cy.url().should('include', '/authentication/signup')
        });

        it('should display email cannot be blank', () => {
            cy.viewport(400, 750)

            cy.visit('http://localhost:4200/authentication/signup');
            cy.wait(1000)
            cy.get('[placeholder=Username]').type('test');
            cy.wait(1000)
            cy.get('button').click();
            cy.contains('Email cannot be blank')
            cy.url().should('include', '/authentication/signup')
        });
    });

})