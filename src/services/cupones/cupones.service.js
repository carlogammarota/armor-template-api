// Initializes the `cupones` service on path `/cupones`
const { Cupones } = require('./cupones.class');
const createModel = require('../../models/cupones.model');
const hooks = require('./cupones.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/cupones', new Cupones(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cupones');

  service.hooks(hooks);
};
