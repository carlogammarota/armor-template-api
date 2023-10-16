// applications-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');
const mongooseSequence = require('mongoose-sequence')(mongoose);

module.exports = function (app) {
  const modelName = 'applications';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    // hostPort: { type: Number },
    subdomain: { type: String, unique: true },
    logo: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    theme: { type: String, required: true },
    plugins: { type: Array, required: true },
    user: { type: Object, required: true },
    link: { type: String, required: false },
  }, {
    timestamps: true
  });

   // Define el campo hostPort después de la definición del schema
  //  schema.add({
  //   hostPort: { type: Number, unique: true }
  // });
    // Define un hook 'beforeValidate' para agregar el campo 'hostPort' antes de la validación
    // schema.pre('validate', function (next) {
    //   if (!this.hostPort) {
    //     this.hostPort = 1001; // Valor inicial para hostPort
    //   }
    //   next();
    // });

    
  
    // Aplica el plugin 'mongoose-sequence' al campo 'hostPort'
    // schema.plugin(mongooseSequence, { inc_field: 'hostPort', start_seq: 1001 });
    
    // Resto del código...
  
    


  // schema.plugin(mongooseSequence, { inc_field: 'hostPort', start_seq: 1001 });
  
  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};
