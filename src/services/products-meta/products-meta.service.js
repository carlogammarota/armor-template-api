// Initializes the `products-meta` service on path `/products-meta`
const { ProductsMeta } = require('./products-meta.class');
const hooks = require('./products-meta.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/products-meta', new ProductsMeta(options, app), async function (req, res) {
    // console.log('req', req);
    // console.log('res', res);
    // if (res.hook.method === 'get') {
    //   console.log('get');
    //   // return 0
    // }
  });




  // Get our initialized service so that we can register hooks
  const service = app.service('products-meta');

  service.hooks(hooks);
};
