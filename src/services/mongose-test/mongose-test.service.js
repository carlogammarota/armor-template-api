// Initializes the `mongose-test` service on path `/mongose-test`
const { MongoseTest } = require('./mongose-test.class');
const createModel = require('../../models/mongose-test.model');
const hooks = require('./mongose-test.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/mongose-test', new MongoseTest(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('mongose-test');

  service.hooks(hooks);
};
