// Initializes the `applications` service on path `/applications`
const { Applications } = require('./applications.class');
const createModel = require('../../models/applications.model');
const hooks = require('./applications.hooks');



module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  console.log("todo fue bien!!")


  //create



  // context



  // Initialize our service with any options it requires
  app.use('/applications', new Applications(options, app), (req, res, next) => {
    console.log("service")
    next()
  });

  // Get our initialized service so that we can register hooks
  const service = app.service('applications');

  service.hooks(hooks);
};



