const users = require('./users/users.service.js');
const messages = require('./messages/messages.service.js');
const todos = require('./todos/todos.service.js');
const eventos = require('./eventos/eventos.service.js');
const segurity = require('./segurity/segurity.service.js');
const mongoseTest = require('./mongose-test/mongose-test.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(messages);
  app.configure(todos);
  app.configure(eventos);
  app.configure(segurity);
  app.configure(mongoseTest);
};
