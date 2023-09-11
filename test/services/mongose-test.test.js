const assert = require('assert');
const app = require('../../src/app');

describe('\'mongose-test\' service', () => {
  it('registered the service', () => {
    const service = app.service('mongose-test');

    assert.ok(service, 'Registered the service');
  });
});
