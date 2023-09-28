// events-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'events';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    // text: { type: String, required: true }
  //   {
  //     "title": "Título del Evento",
  //     "content": "<p>Contenido del evento en formato HTML</p>",
  //     "location": "Ubicación del evento",
  //     "user": "Nombre del usuario",
  //     "user_id": 12345
  // }
  title: { type: String, required: true },
  content: { type: String, required: true },
  location: { type: Array, required: true },
  placeName: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  user: { type: Object, required: true },
  user_id: { type: String, required: true },
  images: { type: Array, required: true },
  metaData: { type: Object, required: true },
  category: { type: Object, required: true },
  category_id: { type: String, required: true },
  stats: { type: Object, required: false, default: { views: 0, likes: 0, shares: 0, comments: 0 } },
  tags: { type: Array, required: false },
  createdAt: { type: Date, required: true, default: Date.now },

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
