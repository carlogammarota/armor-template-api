const { authenticate } = require('@feathersjs/authentication').hooks;

const checkPermissions = require('feathers-permissions');

const restrictToOwner = require('../../hooks/restrict-to-owner-blogs.js');

//hook para que solo el creador del blog pueda modificarlo. en data.user._id debe estar el id del usuario coomparamos con el id del usuario que esta logueado

module.exports = {
  before: {
    // all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
      authenticate('jwt'),
      
    ],
    update: [
      authenticate('jwt'),
      restrictToOwner(),
    ],
    patch: [ authenticate('jwt'),restrictToOwner(),],
    remove: [ authenticate('jwt'),restrictToOwner(),]
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
