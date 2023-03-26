class LoginPage {
  submit(email = null, password = null) {
    cy.visit("/");

    cy.get("input[placeholder$=email]").as("email");
    cy.get("input[placeholder*=senha]").as("password");

    if (email) {
      cy.get("input[placeholder$=email]").type(email);
    }

    if (password) {
      cy.get("input[placeholder*=senha]").type(password);
    }

    cy.contains("button", "Entrar").click();
  }

  noticeShouldBe(message) {
    cy.get(".notice-container")
      .should("be.visible")
      .find(".error p")
      .should("have.text", message);
  }
}

export default new LoginPage();
