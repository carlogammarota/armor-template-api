const assert = require('assert');
const app = require('../../src/app');

describe('\'events-categories\' service', () => {
  it('registered the service', () => {
    const service = app.service('events-categories');

    assert.ok(service, 'Registered the service');
  });
});
