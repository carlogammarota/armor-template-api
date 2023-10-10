// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const axios = require("axios");
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    console.log("create-app", context.data)
        
      // return {
          
      const data = context.data;
  
      console.log("Create App");
      // return 0
      try {
        const response = await axios.post(
          "http://64.227.76.217:2323/build-and-create",
          {
              "password": "contraseña_maestra",
              "data": {
                  "hostPort": data.hostPort,
                  "subdomain": data.subdomain
              }
          }            
        );

      return context
      // await 
      } catch (error) {
        console.log("error", error);
        return {
          message: "Error al crear la aplicación",
        }
        // throw error; // Lanza una excepción si hay un error.
      }
      
      

    
  };
};
