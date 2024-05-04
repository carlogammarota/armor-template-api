const { Service } = require('feathers-mongodb');

exports.ProductsMeta = class ProductsMeta extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('products-meta');
    });
  }
};
