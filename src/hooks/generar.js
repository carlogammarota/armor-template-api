/* eslint-disable no-dupe-keys */
/* eslint-disable no-undef */
/* eslint-disable no-unreachable */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const mercadopago = require('mercadopago');
axios = require('axios');



const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware para procesar solicitudes con cuerpo JSON
app.use(bodyParser.json());


// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {

    let settings = await context.app.service('settings').find();
    // console.log('settings', settings)
    let token = settings.data[0].plugins.mercadopago.mercadopago_token;
    // console.log('token', token);

    //configurar mercadopago
    mercadopago.configure({
      sandbox: false, // si estás probando en el ambiente de pruebas de MercadoPago
    
    
      //la idea es sacar el accces token de la base de datos settings
    
      // access_token: 'APP_USR-8509403097579740-051601-e1c674ca876a173dd84e3b63a2ac3d6e-1375519379'
    
    
      // //produccion
      // access_token: 'APP_USR-114968102990097-051422-4304eafc70b7b7cda809677af7acd94a-94662750'
      
    
    
        // para test
        // access_token: 'APP_USR-5050283024010521-080117-1be3cde8e474088c42201a3722be9673-1304411976'
    
    
        //cuenta ro
        access_token: token
      // aquí debes colocar tu Client Secret
    });



    //esto esta pensado para moneda ARS

    const tipo = context.result.tipo;

    //moneda
    context.result.moneda = 'ARS';
    
    //productos
    let productos = context.result.productos;


    // email del comprador
    let email = context.result.email;

    //hay que buscar el precio de cada producto y sumarlos

    if(tipo === 'producto'){
      for (let i = 0; i < productos.length; i++) {
        let precio = await context.app.service('products').get(productos[i].id);
        productos[i].precio = precio.price;
      }
    } else {
      console.log('no es un producto');
      const error = new Error('No es un producto');
      throw error;
    }

    let total = 0;
    //sumar los precios con tambien la cantidad
    for (let i = 0; i < productos.length; i++) {
      total += productos[i].precio * productos[i].cantidad;
    }
    context.result.total = total;

    //agregar descripcion

    for (let i = 0; i < productos.length; i++) {
      productos[i].description = productos[i].content;
    }


    //imprimir productos para ver si se guardaron los precios
    console.log('result', context.result);


    let res = await context.app.service('payments').create({
      // ticket_generado: false,
      // cantidadTickets: context.result.cantidad,
      email: email,
      productos: context.result.productos,
      total: total,
      moneda: 'ARS',
      tipo: context.result.tipo,
      estado: 'pendiente',
      
    });

    //id donde esta guardado el pago en este momento deberia estar en pendiente
    id_pago = res._id;
    console.log('id_pago', id_pago);

    // return 0

    

    // cantidad (OLD)
    // let cantidad = context.result.cantidad;
    // let entradas = [];

    

    // aca abria que traer el precio del producto desde el servicio de products
    // let precio = await context.app.service('products').get(productos[0].id);

    // for (let i = 0; i < cantidad; i++) {
    //   entradas.push({
    //     'id': i,
    //     'title': 'Ticket Online',
    //     'description': 'Tickets Aura Club Balumba',
    //     'quantity': 1,
    //     'currency_id': 'ARS',
    //     'unit_price': 3000
    //   });
    // }


    const items = context.result.productos.map((producto, index) => {
      return {
        id: index,
        title: producto.title,
        description: producto.description,
        quantity: producto.cantidad,
        currency_id: 'ARS',
        unit_price: producto.precio
      };
    }
    );
    



    // let entradas = [{
    //   'id': 1,
    //   'title': 'Cuenta Premium',
    //   'description': 'Tendrás la oportunidad de publicar más de 5 productos en nuestra tienda en línea',
    //   'quantity': 1,
    //   'currency_id': 'ARS',
    //   'unit_price': 10
    // }];
    
    

    const preference  = {
      title: 'Armor Template',
      // items: [
      //   {
      //     id: '1',
      //     title: 'descripcionProducto',
      //     quantity: 1,
      //     currency_id: 'ARS',
      //     unit_price: 1000
      //   },
      //   {
      //     id: '2',
      //     title: 'otraProducto',
      //     quantity: 1,
      //     currency_id: 'ARS',
      //     unit_price: 1000
      //   },
      // ],
      // items: context.data.items,
      items: items,

      // payer: {
      //   email: 'leo_elgigante_22@hotmail.com'
      // },
      back_urls: {
        // success: 'https://alguientiene.com',
        pending: 'https://aura-producciones.com/',
        // id_pago
        failure: 'https://aura-producciones.com/',
        //este es para descargar la entrada de una
        // success: 'https://api.aura-producciones.com/descargar-entradas/' + id_pago,
        //este link retorna a la web gracias por su compra con la posibilidad de descargar las entrada
        success: 'https://aura-producciones.com/gracias/' + id_pago,
        pending: 'https://aura-producciones.com/gracias/' + id_pago,
        failure: 'https://aura-producciones.com/gracias/' + id_pago
      },
      auto_return: 'approved',
      external_reference: JSON.stringify(id_pago),
      // notification_url: 'https://d004-170-51-93-104.sa.ngrok.io/mercadopago',

      //produccion
      // notification_url: 'https://api.aura-producciones.com/mercadopago',


      //local test
      notification_url: 'https://1e5b-181-111-47-101.ngrok-free.app/mercadopago',



      // notification_url: 'https://api.alguientiene.com/mercadopago',
    };

    let linkDePago = await mercadopago.preferences.create(preference);
    context.result.linkDePago = linkDePago.response.init_point  ;

    console.log('context.result', context.result);

    //si es producto
    // let payment = await context.app.service('payments').patch(id_pago ,{  
    //   id_comprador: context.data.id_comprador,
    //   id_vendedor: pago.payer.email,
    //   type: "producto",
    //   productos: context.result.items,
    //   linkDePago: linkDePago.response.init_point,
    //   estado: 'pendiente',
    //   // id_orden: id_pago      
    // });

    //si es premium
    let payment = await context.app.service('payments').patch(id_pago ,{  
      id_comprador: context.data.id_comprador,
      id_vendedor: 'no se sabe',
      // type: 'premium',
      productos: context.result.productos,
      linkDePago: linkDePago.response.init_point,
      estado: 'pendiente',
      // ticket_generado: false,
      id_user: JSON.stringify(id_pago),
      // cantidadTickets: cantidad,
      email: email,
      estado: 'pendiente',
      // participantes: context.result.participantes,

      // id_orden: id_pago      
    });

    // if(payment){



    console.log('payment', payment);

    // context.result = linkDePago.body.init_point;

    context.result = {
      linkDePago: linkDePago.response.init_point,
      id_pago: id_pago,
      total: total,
    };


    return context;
  };
};
