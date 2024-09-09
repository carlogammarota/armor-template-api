const assert = require('assert');
const app = require('../../src/app');

describe('\'restaurant\' service', () => {
  it('registered the service', () => {
    const service = app.service('restaurant');

    assert.ok(service, 'Registered the service');
  });
});
