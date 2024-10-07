const { authenticate } = require('@feathersjs/authentication').hooks;
const restrictToOwner = require('../../hooks/restrict-to-owner-products.js');
module.exports = {
  before: {
    // all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [authenticate('jwt'), ],
    update: [authenticate('jwt'), restrictToOwner()],
    //arreglar
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
