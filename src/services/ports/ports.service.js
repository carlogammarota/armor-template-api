// Initializes the `ports` service on path `/ports`
const { Ports } = require('./ports.class');
const createModel = require('../../models/ports.model');
const hooks = require('./ports.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/ports', new Ports(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('ports');

  service.hooks(hooks);
};
