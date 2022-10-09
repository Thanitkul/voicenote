describe('Visit Landing', () => {
    it('should see', () => {
        cy.viewport(400, 750)
        cy.visit('http://localhost:4200');

        cy.get('[data-testid=header-voice]').should('have.text', 'Voice');
        cy.get('[data-testid=header-note]').should('have.text', 'Note');
        cy.get('[data-testid=p-note-taking]').should('have.text', 'Note-Taking');
        cy.get('[data-testid=p-note-made-easy]').should('have.text', 'made easy');
        cy.get('[data-testid=btn-teacher]').should('contain', 'Teacher');
        cy.get('[data-testid=btn-student]').should('contain', 'Student');
        cy.contains('New here? Create an Account');
    })
})