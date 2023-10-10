const { Service } = require("feathers-mongoose");
const axios = require("axios");
exports.Applications = class Applications extends Service {


    async create(data, params) {
        
    
        // const user = params.user;
        const { subdomain, logo, title, description, theme, plugins } = data;
        // console.log("params.user");
        // console.log(data);
        console.log("Create App");
        // return 0
        try {
          const response = await axios.post(
            "http://64.227.76.217:2323/build-and-create",
            {
              password: "contraseña_maestra",
              data: {
                hostPort: data.hostPort,
                subdomain: data.subdomain,
              },
            }
          );
          console.log("response", response);
          return response.data; // Devuelve los datos de la respuesta o lo que sea necesario aquí.
        } catch (error) {
          console.log("error", error);
          return {
            message: "Error al crear la aplicación",
          }
          throw error; // Lanza una excepción si hay un error.
        }
      }

  //post
  //model
  //   {
  //     "subdomain": "despierta-capillaaaaa6",
  //     "logo": "https://despierta-capilla-8.armortemplate.site/assets/logo-c9ca0974.svg", //svg
  //     "title": "Vue3 E-commerce, Event's and Blogging Theme",
  //     "description":"Introducing Armor Template, a robust and feature-rich web theme that combines the power of modern technologies to kickstart your next online project. Crafted with Vue3, Vuex, Tailwind CSS, Express.js (SSR), Node.js, and Socket.io, Feathers.js (rest) this versatile template offers everything you need to create a dynamic web presence.",
  //     "theme": "dark",
  //     "plugins": ["mercadopago", "paypal", "strapi"],
  //     "user": {}
  // }
//   async create(data, params) {
//     console.log("data", params.user);

//     const user = params.user;
//     const { subdomain, logo, title, description, theme, plugins } = data;

//     //   {
//     //     "password": "contraseña_maestra",
//     //     "data": {
//     //         "hostPort": "3008",
//     //         "subdomain": "despierta-capilla-10"
//     //     }
//     // }

//     // let data = {
//     //   password: 'contraseña_maestra',
//     //   data: {
//     //     hostPort: '3008',
//     //     subdomain: 'despierta-capilla-10'
//     //   }
//     // }
//     // console.log('data', data);

//     //   const { password, data } = data;

//     try {
//       const response = await axios.post(
//         "http://localhost:2323/build-and-create",
//         {
//           password: "contraseña_maestra",
//           data: {
//             hostPort: data.hostPort,
//             subdomain: data.subdomain,
//           },
//         }
//       );
//       console.log("response", response);
//       return 
//     } catch (error) {
//       console.log("error", error);
//       return error;
//     }
//   }
};


