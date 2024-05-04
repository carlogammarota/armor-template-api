

const returnProductFromSlug = require('../../hooks/return-product-from-slug');

module.exports = {
  before: {
    all: [],
    find: [],
    // get: [returnProductFromSlug()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    // get: [returnProductFromSlug()],
    get: [returnProductFromSlug()],
    // get: [
    //   // async context => {
    //   //   // console.log('context', context);
    //   //   // const { app, id, params } = context;
    //   //   // const { query = {} } = params;
    //   //   // const { slug } = query;
    //   //   // if(slug){
    //   //   //   const products = app.service('products');
    //   //   //   const product = await products.find({query: {slug}});
    //   //   //   if(product.data.length > 0){
    //   //   //     context.result = product.data[0];
    //   //   //   }
    //   //   // }
    //   //   return context;
    //   // }as

    //   // async context => {
    //   //   return 0 
    //   // }
    // ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
