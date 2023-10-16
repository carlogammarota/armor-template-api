// settings-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'settings';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    // text: { type: String, required: true }
    // "_id": "652dbaaaf522ff35aa9c932a",
    // "logo": "https://armortemplate.site/assets/logo-c9ca0974.svg",
    // "title": "Vue3 E-commerce, Event's and Blogging Theme",
    // "description": "Introducing Armor Template, a robust and feature-rich web theme that combines the power of modern technologies to kickstart your next online project. Crafted with Vue3, Vuex, Tailwind CSS, Express.js (SSR), Node.js, and Socket.io, Feathers.js (rest) this versatile template offers everything you need to create a dynamic web presence.",
    // "theme": "dark",
    // "products": true,
    // "events": true,
    // "blog": true,
    // "users": true,
    // "admin": true,
    // "plugins": [
    //     "mercadopago",
    //     "paypal",
    //     "strapi"
    // ],
    // "meta": {
    //     "title": "Vue3 E-commerce, Event's and Blogging Theme",
    //     "description": "Introducing Armor Template, a robust and feature-rich web theme that combines the power of modern technologies to kickstart your next online project. Crafted with Vue3, Vuex, Tailwind CSS, Express.js (SSR), Node.js, and Socket.io, Feathers.js (rest) this versatile template offers everything you need to create a dynamic web presence.",
    //     "img": "https://i.ibb.co/Wn33HgY/meta.jpg"
    // }
    logo: { type: String, required: true },
    title: { type: String, required: false },
    description: { type: String, required: false },
    theme: { type: String, required: false },
    products: { type: Boolean, required: false },
    events: { type: Boolean, required: false },
    blog: { type: Boolean, required: false },
    users: { type: Boolean, required: false },
    admin: { type: Boolean, required: false },
    plugins: { type: Array, required: false },
    meta: { type: Object, required: true },

  }, {
    timestamps: true,

  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};
