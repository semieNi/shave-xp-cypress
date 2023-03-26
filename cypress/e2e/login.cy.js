/// <reference types="cypress" />
import loginPage from "../support/pages/login";
import shaversPage from "../support/pages/shavers";

describe("login", () => {
  context("quando submeto o formulário", () => {
    it("deve logar com sucesso", () => {
      const user = {
        name: "Lion",
        email: "smnesports@gmail.com",
        password: "pwd123",
      };

      loginPage.submit(user.email, user.password);

      shaversPage.header.userShouldBeLoggedIn(user.name);
    });

    it("não deve logar com senha incorreta", () => {
      const user = {
        name: "Lion",
        email: "smnesports@gmail.com",
        password: "asd123",
      };

      loginPage.submit(user.email, user.password);

      const message =
        "Ocorreu um erro ao fazer login, verifique suas credenciais.";

      loginPage.noticeShouldBe(message);
    });

    it("não deve logar com email não cadastrado", () => {
      const user = {
        name: "Lion",
        email: "smnesports@404.com",
        password: "pwd123",
      };

      loginPage.submit(user.email, user.password);

      const message =
        "Ocorreu um erro ao fazer login, verifique suas credenciais.";

      loginPage.noticeShouldBe(message);
    });

    it.only("campos obrigatórios", () => {
      loginPage.submit();

      cy.get(".alert-error")
        .should("have.length", 2)
        .and(($small) => {
          expect($small.get(0).textContent).to.eq("E-mail é obrigatório");
          expect($small.get(1).textContent).to.eq("Senha é obrigatória");
        });
    });
  });
});
