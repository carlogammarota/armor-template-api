const { Service } = require('feathers-mongodb');

exports.Segurity = class Segurity extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('segurity');
    });
  }
};
