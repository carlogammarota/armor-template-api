const { authenticate } = require('@feathersjs/authentication').hooks;
const checkPermissions = require("feathers-permissions");
module.exports = {
  before: {
    // all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
      authenticate('jwt'),
       checkPermissions({
        roles: ["admin", "settings"],
      }),
    ],
    update: [
      authenticate('jwt'),
       checkPermissions({
        roles: ["admin", "settings"],
      }),
      
    ],
    patch: [
      authenticate('jwt'),
       checkPermissions({
        roles: ["admin", "settings"],
      }),
      
    ],
    remove: [
      authenticate('jwt'),
       checkPermissions({
        roles: ["admin", "settings"],
      }),
      
    ]
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
