const { authenticate } = require('@feathersjs/authentication').hooks;
const restrictToOwner = require('../../hooks/restrict-to-owner-events.js');
module.exports = {
  before: {
    // all: [  ],
    find: [],
    get: [],
    create: [authenticate('jwt')],
    update: [authenticate('jwt'), restrictToOwner()],
    patch: [authenticate('jwt'), restrictToOwner()],
    remove: [authenticate('jwt'), restrictToOwner()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
