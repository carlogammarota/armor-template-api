const { authenticate } = require('@feathersjs/authentication').hooks;

const portCount = require('../../hooks/port-count');

const createApp = require('../../hooks/create-app');

const deletePorts = require('../../hooks/delete-ports');

const generateApp = require('../../hooks/generate-app');

module.exports = {
  before: {
    // all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [authenticate('jwt'), portCount(), createApp()],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [generateApp()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [deletePorts()],
    update: [],
    patch: [],
    remove: []
  }
};
