// cupones-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "cupones";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      // text: { type: String, required: true }
      nombre: { type: String, required: true },
      descripcion: { type: String, required: true },
      codigo: { type: String, required: true },
      descuento: { type: Number, required: true },
      fecha_inicio: { type: Date, required: true },
      fecha_fin: { type: Date, required: true },
      cantidad: { type: Number, required: true },
      cantidad_disponible: { type: Number, required: true },
      estado: { type: Boolean, required: true },
      // tipo: { type: String, required: true },
      // usuario: { type: Schema.Types.ObjectId, ref: 'usuarios' },
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
