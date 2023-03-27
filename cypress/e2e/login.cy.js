/// <reference types="cypress" />
import loginPage from "../support/pages/login";
import shaversPage from "../support/pages/shavers";
import data from "../fixtures/users-login.json";

describe("login", () => {
  context("quando submeto o formulário", () => {
    it("deve logar com sucesso", () => {
      const user = data;

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

    it("campos obrigatórios", () => {
      loginPage.submit();
      loginPage.requiredFields("E-mail é obrigatório", "Senha é obrigatória");
    });

    context("senha muito curta", () => {
      const password = ["1", "12", "123", "1234", "12345"];

      password.forEach((p) => {
        it("não deve logar com a senha " + p, () => {
          loginPage.submit("smnesports@gmail.com", p);
          loginPage.alertShouldBe("Pelo menos 6 caracteres");
        });
      });
    });

    context("email no formato incorreto", () => {
      const emails = [
        "smnesports&gmail.com",
        "smnesports.com.br",
        "@gmail.com",
        "@",
        "smnesports@",
        "123123123",
        "!@#$%!@#$%",
        "smnesports@gmail",
      ];

      emails.forEach((e) => {
        it("não deve logar com e-mail " + e, () => {
          loginPage.submit(e, "pwd123");
          loginPage.alertShouldBe("Informe um email válido");
        });
      });
    });
  });
});
