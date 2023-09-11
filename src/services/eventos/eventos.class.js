const { Service } = require('feathers-mongodb');

exports.Eventos = class Eventos extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('eventos');
    });
  }
};
