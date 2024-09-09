// Initializes the `restaurant` service on path `/restaurant`
const { Restaurant } = require('./restaurant.class');
const createModel = require('../../models/restaurant.model');
const hooks = require('./restaurant.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  app.get('/restaurant/types', async (req, res) => {
    //recorrer todos los restaurantes que son los platos y obtener los tipos
    const restaurantService = app.service('restaurant');
    const restaurants = await restaurantService.find();
    const types = restaurants.data.map(restaurant => restaurant.type);
    const uniqueTypes = [...new Set(types)];
    res.send(uniqueTypes);
  });

  // Initialize our service with any options it requires
  app.use('/restaurant', new Restaurant(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('restaurant');

  service.hooks(hooks);
};
