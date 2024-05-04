const assert = require('assert');
const app = require('../../src/app');

describe('\'products-meta\' service', () => {
  it('registered the service', () => {
    const service = app.service('products-meta');

    assert.ok(service, 'Registered the service');
  });
});
