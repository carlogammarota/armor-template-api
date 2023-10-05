// blogs-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'blogs';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    // text: { type: String, required: true }
  //   {
  //     "title": "Mi Blog",
  //     "content": "<h1> contenido de mi blog </h1>",
  //     "image": "https://picsum.photos/400/300",
  //     "metaData": {
  //         "titulo": "Mi Blog",
  //         "descripcion": "Bienvenido a mi blog. Aquí encontrarás contenido interesante.",
  //         "img": "https://picsum.photos/400/301"
  //     }
  // }
    
    title: { type: String, required: true },
    content: { type: String, required: true },
    th: { type: String, required: true },
    user: { type: String, required: true },
    imgUser: { type: String, required: true },
    ubication: { type: String, required: true },
    images: { type: Array, required: true },
    metaData: { type: Object, required: true },
    category: { type: Object, required: true },
    category_id: { type: String, required: true },
    user_id: { type: String, required: true },
    user: { type: String, required: true },
    
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
