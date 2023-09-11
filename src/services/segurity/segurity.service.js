// Initializes the `segurity` service on path `/segurity`
const { Segurity } = require('./segurity.class');
const hooks = require('./segurity.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/segurity', new Segurity(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('segurity');

  service.hooks(hooks);
};
