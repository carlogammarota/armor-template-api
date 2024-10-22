const assert = require('assert');
const app = require('../../src/app');

describe('\'envios\' service', () => {
  it('registered the service', () => {
    const service = app.service('envios');

    assert.ok(service, 'Registered the service');
  });
});
