const { Service } = require('feathers-mongoose');
const axios = require('axios');
exports.Products = class Products extends Service {
    // async create(data, params) {
    //     // Crea el blog utilizando el servicio de Feathers.js
    //     // const createdBlog = await this.options.Model.create(data, params);
    //     console.log('createdBlog', data);
    //     // Datos para la solicitud Axios POST
    //     const axiosData = {
    //       password: 'stuart',
    //       message: {
    //         title: 'Armor: Nuevo Producto',
    //         body: data.title
    //       }
    //     };
    
    //     try {
    //       // Realiza la solicitud Axios POST a localhost:2222/notification
    //       await axios.post('http://localhost:2222/notification', axiosData);
    
    //     return data; // Devuelve el blog creado
    //     } catch (error) {
    //       // Maneja errores si la solicitud Axios POST falla
    //       console.error('Error al enviar la notificación:', error);
    //     //   return createdBlog; // Puedes decidir qué hacer en caso de error
    //     return data;
    //     }
    //   }
};
