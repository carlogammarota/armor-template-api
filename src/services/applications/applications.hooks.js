const { authenticate } = require("@feathersjs/authentication").hooks;

const portCount = require("../../hooks/port-count");

const createApp = require("../../hooks/create-app");

const deletePorts = require("../../hooks/delete-ports");

const generateApp = require("../../hooks/generate-app");

const checkPermissions = require("feathers-permissions");

const removeApp = require("../../hooks/remove-app");

module.exports = {
  before: {
    // all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
      authenticate("jwt"),
      checkPermissions({
        roles: ["subscribe"],
      }),
      portCount(),
      createApp(),
    ],
    update: [
      authenticate("jwt"),
      checkPermissions({
        // roles: ["admin"],
        //subscribe or admin
        roles: ["admin", "subscribe"],



      }),
    ],
    patch: [
      authenticate("jwt"),
      checkPermissions({
        roles: ["subscribe"],
      }),
    ],
    remove: [
      authenticate("jwt"),
      checkPermissions({
        roles: ["subscribe"],
      }),
      removeApp(),
    ],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [generateApp()],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    // create: [deletePorts()],
    update: [],
    patch: [],
    remove: [],
  },
};
