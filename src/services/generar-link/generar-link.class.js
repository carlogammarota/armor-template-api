const { Service } = require('feathers-mongodb');

exports.GenerarLink = class GenerarLink extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('generar-link');
    });
  }
};
