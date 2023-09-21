// Initializes the `events-categories` service on path `/events-categories`
const { EventsCategories } = require('./events-categories.class');
const createModel = require('../../models/events-categories.model');
const hooks = require('./events-categories.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/events-categories', new EventsCategories(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('events-categories');

  service.hooks(hooks);
};
