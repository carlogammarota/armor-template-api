const { Service } = require('feathers-mongodb');

exports.Mercadopago = class Mercadopago extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('mercadopago');
    });
  }
};
