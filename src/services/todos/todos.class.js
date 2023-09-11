const { Service } = require('feathers-mongodb');

exports.Todos = class Todos extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('todos');
    });
  }
};
