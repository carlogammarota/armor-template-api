const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const restrictToOwnerOrAdmin = require('../../hooks/restrict-to-owner-or-admin');
const checkPermissions = require('feathers-permissions');

module.exports = {
  before: {
    all: [],
  //   find: [authenticate('jwt'), 
  //   // checkPermissions({
  //   //   roles: [ 'search-users' ]
  //   // }),
  // ],
//   find: [authenticate('jwt'),
//   // checkPermissions({
//   //   permissions: [ 'admin', 'user' ]
//   // })
//   // checkPermissions({
//   //   roles: [ 'customer' ]
//   // })
// ],

    get: [authenticate('jwt')],
    create: [ hashPassword('password') ],
    update: [hashPassword('password'), authenticate('jwt'), restrictToOwnerOrAdmin()],
    patch: [hashPassword('password'), authenticate('jwt'), restrictToOwnerOrAdmin()],
    remove: [authenticate('jwt'), restrictToOwnerOrAdmin()]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
