const { authenticate } = require("@feathersjs/authentication").hooks;

const portCount = require("../../hooks/port-count");

const createApp = require("../../hooks/create-app");

const deletePorts = require("../../hooks/delete-ports");

const generateApp = require("../../hooks/generate-app");

const checkPermissions = require("feathers-permissions");

const removeApp = require("../../hooks/remove-app");

const updateApp = require("../../hooks/update-app");

const restrictToOwner = require('../../hooks/restrict-to-owner-applications.js');

const restrictTo_1_app = require('../../hooks/restrict-to-1-app.js');

module.exports = {
  before: {
    // all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
      authenticate("jwt"),
      restrictTo_1_app(),
      checkPermissions({
        roles: ["free", "subscribe"],
      }),
      portCount(),
      createApp(),
    ],
    update: [
      authenticate("jwt"),
      // checkPermissions({
      //   // roles: ["admin"],
      //   //subscribe or admin
      //   roles: [ "subscribe"],
      // }),
      restrictToOwner(),
      updateApp(),
    ],
    patch: [
      authenticate("jwt"),
      checkPermissions({
        roles: ["subscribe", "free"],
      }),
      restrictToOwner(),
    ],
    remove: [
      authenticate("jwt"),
      restrictToOwner(),
      checkPermissions({
        roles: ["subscribe", "free"],
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
