const users = require('./users/users.service.js');
const messages = require('./messages/messages.service.js');
const todos = require('./todos/todos.service.js');
const eventos = require('./eventos/eventos.service.js');
const segurity = require('./segurity/segurity.service.js');
const mongoseTest = require('./mongose-test/mongose-test.service.js');
const products = require('./products/products.service.js');
const blogs = require('./blogs/blogs.service.js');
const productsCategories = require('./products-categories/products-categories.service.js');
const blogsCategories = require('./blogs-categories/blogs-categories.service.js');
const events = require('./events/events.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(messages);
  app.configure(todos);
  app.configure(eventos);
  app.configure(segurity);
  app.configure(mongoseTest);
  app.configure(products);
  app.configure(blogs);
  app.configure(productsCategories);
  app.configure(blogsCategories);
  app.configure(events);
};
