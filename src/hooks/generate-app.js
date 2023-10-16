// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const axios = require("axios");
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    console.log("Generando Aplicacion")
    const api_port = context.data.ports.api_port;
    const frontend_port = context.data.ports.frontend_port;
    const subdomain = context.data.subdomain;

    try {
      const createApp = await axios.post("http://64.227.76.217:3131/create-app", {
        //hay que enviarle con contraseña (si se vende como template ocultar esto)
        api_port,
        frontend_port,
        subdomain,
      });
      console.log("createApp", createApp.data);
      context.data.link = createApp.data.link;
      return context;
    } catch (error) {
      console.log("error", error);
      return {
        message: "Error al crear la aplicación",
      }
    }



    return context;
  };
};
