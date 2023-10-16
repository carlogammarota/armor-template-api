const assert = require('assert');
const app = require('../../src/app');

describe('\'ports\' service', () => {
  it('registered the service', () => {
    const service = app.service('ports');

    assert.ok(service, 'Registered the service');
  });
});
