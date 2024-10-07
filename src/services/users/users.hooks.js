const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const restrictToOwnerOrAdmin = require('../../hooks/restrict-to-owner-or-admin');
const checkPermissions = require('feathers-permissions');

const restrictToOwner = require('../../hooks/restrict-to-owner-users.js');

const setCustomer = require('../../hooks/set-customer');

const isAdmin = require('../../hooks/is-admin');



//hook para que 

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



    // get: [authenticate('jwt')],
    create: [//poner en permissions ["customer"]
      hashPassword('password'), setCustomer()],
    update: [hashPassword('password'), authenticate('jwt'), restrictToOwner()
      //   
      //  checkPermissions({
      //    permissions: [ 'admin', 'user' ]
      //  })
    ],
    patch: [hashPassword('password'), authenticate('jwt'), restrictToOwner()],
    remove: [authenticate('jwt'), 
    checkPermissions({
      permissions: ['admin']
    }), restrictToOwner()]
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
