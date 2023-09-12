//crear modelo de users 

// module.exports = function (app) {
//     const modelName = 'mongoseTest';
//     const mongooseClient = app.get('mongooseClient');
//     const { Schema } = mongooseClient;
//     const schema = new Schema({
//       text: { type: String, required: true }
//     }, {
//       timestamps: true
//     });
  
//     // This is necessary to avoid model compilation errors in watch mode
//     // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
//     if (mongooseClient.modelNames().includes(modelName)) {
//       mongooseClient.deleteModel(modelName);
//     }
//     return mongooseClient.model(modelName, schema);
    
//   };
  
  module.exports = function (app) {
    const modelName = 'users';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema({
      email: { type: String, unique: true, lowercase: true, required: true },
      password: { type: String, required: true },
      name: { type: String },
      permissions: { type: Array, required: true},
    }, {
      timestamps: true
    });
  
    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
      mongooseClient.deleteModel(modelName);
    }
    return mongooseClient.model(modelName, schema);
    
  }