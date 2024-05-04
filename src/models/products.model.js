// products-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "products";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
      price: { type: Number, required: true },
      images: { type: Array, required: true },
      metaData: { type: Object, required: true },
      category: { type: Object, required: true },
      user_id: { type: String, required: true },
      user: { type: Object, required: true },
      slug: { type: String, required: true },
      quantity: { type: Number, required: true },
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
