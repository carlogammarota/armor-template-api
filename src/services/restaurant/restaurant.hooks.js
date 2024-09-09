const { authenticate } = require("@feathersjs/authentication").hooks;
const checkPermissions = require("feathers-permissions");
module.exports = {
  before: {
    // all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
      // [importante!!] siempre para usar checkPermissions hay que tener un authenticate
      authenticate("jwt"),
      checkPermissions({
        roles: ["restaurant"],
      }),
      
    ],
    update: [
      authenticate("jwt"),
      checkPermissions({
        roles: ["restaurant"],
      }),
    ],
    patch: [
      authenticate("jwt"),
      checkPermissions({
        roles: ["restaurant"],
      }),
    ],
    remove: [
      authenticate("jwt"),
      checkPermissions({
        roles: ["restaurant"],
      }),
    ],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
