// envios-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'envios';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    // text: { type: String, required: true }
    //envios metodos
    metodo: { type: String, required: true },
    //envios costos
    costo: { type: Number, required: true },
    //envios tiempo
    tiempo: { type: Number, required: true },
    //envios descripcion
    descripcion: { type: String, required: true },
    //envios activo
    activo: { type: Boolean, required: true },
    //envios imagen
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
