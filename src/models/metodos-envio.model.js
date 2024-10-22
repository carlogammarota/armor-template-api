// metodos-envio-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'metodosEnvio';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    // text: { type: String, required: true }
    //metodos de envio
    nombre: { type: String, required: true },
    //metodos de envio
    costo: { type: Number, required: true },
    //metodos de envio
    tiempo_dias: { type: Number, required: true },
    //metodos de envio
    descripcion: { type: String, required: true },
    //metodos de envio
    activo: { type: Boolean, required: true },
    //metodos de envio
    imagen: { type: String, required: true },


  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};
