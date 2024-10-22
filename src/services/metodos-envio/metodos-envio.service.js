// Initializes the `metodos-envio` service on path `/metodos-envio`
const { MetodosEnvio } = require('./metodos-envio.class');
const createModel = require('../../models/metodos-envio.model');
const hooks = require('./metodos-envio.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/metodos-envio', new MetodosEnvio(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('metodos-envio');

  service.hooks(hooks);
};
