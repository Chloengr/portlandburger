Cypress.Commands.add("login", (role, options = {}) => {
  let username;
  let password = "password";

  switch (role) {
    case "USER":
      username = "user";
      break;
    case "ADMIN":
      username = "admin";
      break;
    default:
      username = "admin";
  }

  return cy
    .visit("/")
    .getDataCy("username-input")
    .type(username)
    .getDataCy("password-input")
    .type(password)

    .getDataCy("submit-login")
    .click();
});
