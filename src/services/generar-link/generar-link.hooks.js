const generar = require("../../hooks/generar");

const imprimir = (module.exports = (options = {}) => {
  return async (context) => {
    console.log("imprimir", context.data);
    return context;
  };
});
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [imprimir()],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [generar()],
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
