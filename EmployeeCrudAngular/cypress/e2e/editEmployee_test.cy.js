describe('editEmployeeTest', () => {

  const homeURL = Cypress.env('homeUrl');
  const apiURL = Cypress.env('apiUrl');

  before(() => {
      cy.request({
          method: 'POST',
          url: apiURL + '/Create',
          body: {
            "id": 0,
            "name": "test employee",
            "createdDate": "2024-09-29T09:33:10.524Z"
          },
          failOnStatusCode: false // Ensure Cypress doesn't fail the test if the status code isn't 200
        })
  });

    // it('Should fail to update an already created employee', () => {
    //   cy.visit(homeURL) // Colocar la url local o de Azure de nuestro front
    //   /* ==== Generated with Cypress Studio ==== */
    //   cy.get('tr:last-child > :nth-child(4) > a > .fa').click();
    //   cy.wait(300);
    //   cy.get('.btn').click();
    //   cy.get('div.toast-message.ng-star-inserted').should('have.text', ' El empleado ya se encuentra registrado. ');
    //   /* ==== End Cypress Studio ==== */
    // })

    it('Should format employee name when updating an employee', () => {
      cy.visit(homeURL) // Colocar la url local o de Azure de nuestro front

      /* ==== Generated with Cypress Studio ==== */
      cy.get('tr:last-child > :nth-child(4) > a > .fa').click();
      cy.wait(3000);
      cy.get('.form-control').clear();
      cy.get('.form-control').type('updated test employee');
      cy.get('.btn').click();
      cy.get('tr:last-child > :nth-child(2)').should('have.text', ' Updated Test EMPLOYEE ');
      /* ==== End Cypress Studio ==== */
    })


    it('Should fail to update an employee when name contains numbers', () => {
      cy.visit(homeURL) // Colocar la url local o de Azure de nuestro front

      /* ==== Generated with Cypress Studio ==== */
      cy.get('tr:last-child > :nth-child(4) > a > .fa').click();
      cy.wait(300);
      cy.get('.form-control').clear('Test EMPLOYEE ');
      cy.get('.form-control').type('Test EMPLOYEE 1');
      cy.get('.btn').click();
      cy.get('div.toast-message.ng-star-inserted').should('have.text', ' El nombre del empleado no debe contener números. ');
      /* ==== End Cypress Studio ==== */
    })

    it('Should fail to update an employee when a part of name is of length 1', () => {
      cy.visit(homeURL) // Colocar la url local o de Azure de nuestro front

      /* ==== Generated with Cypress Studio ==== */
      cy.get('tr:last-child > :nth-child(4) > a > .fa').click();
      cy.wait(300);
      cy.get('.form-control').clear();
      cy.get('.form-control').type('T Employee');
      cy.get('.btn').click();
      cy.get('div.toast-message.ng-star-inserted').should('have.text', ' Los nombres y apellidos del empleado debe tener una longitud mayor a 1 letra. ');
      /* ==== End Cypress Studio ==== */
    })

    it('Should fail to update an employee when name is longer than 100', () => {
      cy.visit(homeURL) // Colocar la url local o de Azure de nuestro front

      const invalidName = 'a'.repeat(120);

      cy.get('tr:last-child > :nth-child(4) > a > .fa').click();
      cy.wait(300);
      cy.get('.form-control').clear();
      cy.get('.form-control').type(invalidName);
      cy.get('.btn').click();
      cy.get('div.toast-message.ng-star-inserted').should('have.text', ' El nombre del empleado no puede contener más de 100 letras. ');
      
    })

    it('Should fail to update employee when name contains repeated characters', () => {
      cy.visit(homeURL) // Colocar la url local o de Azure de nuestro front

      /* ==== Generated with Cypress Studio ==== */
      cy.get('tr:last-child > :nth-child(4) > a > .fa').click();
      cy.wait(300);
      cy.get('.form-control').clear('N');
      cy.get('.form-control').type('New emploeeee');
      cy.get('.btn').click();
      cy.get('div.toast-message.ng-star-inserted').should('have.text', ' El nombre del empleado no debe contener caracteres repetidos de manera excesiva. ');
      /* ==== End Cypress Studio ==== */
    })

    after(() => {
      let fullText;
      let lastID;

      cy.visit(homeURL);

      cy.wait(300);

      cy.get('tr:last-child > :nth-child(1)').then(($element) => {
        fullText = $element.text();
        lastID = fullText.slice(11).trim();

        cy.request({
          method: 'DELETE',
          url: `${apiURL}/Delete?id=${lastID}`
        })
      });

    });

  })