const { authenticate } = require('@feathersjs/authentication').hooks;
const checkPermissions = require('feathers-permissions');
module.exports = {
  before: {
    all: [  ],
    find: [
      authenticate('jwt'),
      // checkPermissions({
      //   roles: [ 'admin' ]
      // }),
    ],
    get: [],
    create: [
      authenticate('jwt'),
      checkPermissions({
        roles: [ 'admin' ]
      }),
    ],
    update: [
      authenticate('jwt')
    ],
    patch: [
      authenticate('jwt')
    ],
    remove: []
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
