// Initializes the `envios` service on path `/envios`
const { Envios } = require('./envios.class');
const createModel = require('../../models/envios.model');
const hooks = require('./envios.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/envios', new Envios(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('envios');

  service.hooks(hooks);
};
