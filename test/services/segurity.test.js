const assert = require('assert');
const app = require('../../src/app');

describe('\'segurity\' service', () => {
  it('registered the service', () => {
    const service = app.service('segurity');

    assert.ok(service, 'Registered the service');
  });
});
