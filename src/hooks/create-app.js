// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const axios = require("axios");
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    // console.log("create-app", context.data)
        
      // return {

      //hacer logica solo dejar crear si el usuario tiene el plan Premium 
          
      const data = context.data;
      context.data.link = "https://"+data.subdomain+".armortemplate.site";

      // const frontend_port = 2002
      // const api_port = 1002

      try {
        const port = await context.app.service("ports").find({
          query: {
            $limit: 100,
            // $sort: {
            //   api_port: 1,
            // },
          },
        });
        console.log("port", port.total);
        // if (port.total == 0) {
        //   console.log("No hay puertos");
        //   return {
        //     message: "No hay puertos disponibles",
        //   };
        // }
        const port_api = port.total + 1002;
        const port_frontend = port.total + 2002;

        console.log("port_api", port_api);
        console.log("port_frontend", port_frontend);


        try {
          const setPorts = await context.app.service("ports").create({
            api_port: port_api,
            frontend_port: port_frontend,
          });
          console.log("setPorts", setPorts);
          context.data.ports_id = setPorts._id;
          context.data.ports = setPorts;  
        } catch (error) {
          console.log("error", error);
          return {
            message: "Error al crear la aplicación",
          }
        }

        return context
        
      } catch (error) {
        console.log("error", error);
        return {
          message: "Error al crear la aplicación",
        }
        // throw error; // Lanza una excepción si hay un error.
      }


      return "dev"
  
      console.log("Create App");
      




      // try {
      //   const response = await axios.post(
      //     "http://64.227.76.217:3131/create-app",
      //     //IMPORTANTE: faltan mandar contraseña 
      //     {
      //       "subdomain": "ibot-design",
      //       "api_port": 1001,
      //       "frontend_port": 2001
      //     }           
      //   );
      // } catch (error) {
      //   console.log("error", error);
      //   return {
      //     message: "Error al crear la aplicación",
      //   }
      //   // throw error; // Lanza una excepción si hay un error.
      // }
      

      // return context
      // // await 
      // } catch (error) {
      //   console.log("error", error);
      //   return {
      //     message: "Error al crear la aplicación",
      //   }
      //   // throw error; // Lanza una excepción si hay un error.
      // }
      
      

    
  };
};
