require('@cypress/react/support');

Cypress.on('window:before:load', (win) => {
  win.handleFromCypress = function (request) {
    return fetch(request.url, {
      method: request.method,
      headers: request.requestHeaders,
      body: request.requestBody
    }).then((res) => {
      let content = res.headers.get('content-type').includes('application/json')
        ? res.json()
        : res.text();
      return new Promise((resolve) => {
        content.then((body) => resolve([res.status, res.headers, body]));
      });
    });
  };
});

Cypress.Commands.add('login', () => {
  cy.window().its('localStorage').invoke('setItem', '_auth_t', 'hello');

  cy.window().its('localStorage').invoke('setItem', '_auth_t_type', 'hello');
  cy.window().its('localStorage').invoke('setItem', '_my_app_session', 'hello');

  var expTime = new Date(new Date().getTime() + 3600 * 60 * 1000);
  cy.window().its('localStorage').invoke('setItem', '_auth_time', expTime);
  cy.window()
    .its('localStorage')
    .invoke('setItem', '_auth_state', '{"token":"asd","expiresIn":"3600"}');
});
