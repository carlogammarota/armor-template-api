const assert = require('assert');
const app = require('../../src/app');

describe('\'metodos-envio\' service', () => {
  it('registered the service', () => {
    const service = app.service('metodos-envio');

    assert.ok(service, 'Registered the service');
  });
});
