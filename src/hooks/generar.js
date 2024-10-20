// eslint-disable-next-line no-dupe-keys
/* eslint-disable no-undef */
/* eslint-disable no-unreachable */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
// const mercadopago = require("mercadopago");
const crypto = require("crypto");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');

async function createMercadoPagoPreference(token, data) {
  const url = 'https://api.mercadopago.com/checkout/preferences';


  try {
      const response = await axios.post(url, data, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          }
      });
       console.log('Preference created:', response.data);
      return response.data.init_point;
  } catch (error) {
      console.error('Error creating preference:', error.response ? error.response.data : error.message);
  }
}

const app = express();

// Middleware para procesar solicitudes con cuerpo JSON
app.use(bodyParser.json());

// const mercadopago = require('mercadopago');
// const crypto = require('crypto');

module.exports = (options = {}) => {
  return async (context) => {
    // Obtener configuración
    let settings = await context.app.service("settings").find();
    let token = settings.data[0].plugins.mercadopago.mercadopago_token;

    token = "APP_USR-3339336448677361-041601-091aece8a0c670acde2ef5048390f69e-94662750"

    //por el momento harcodeamos el token
  //  token = "APP_USR-5050283024010521-080117-1be3cde8e474088c42201a3722be9673-1304411976";

  console.log("TOKEN", token);

    // Configurar MercadoPago
    // mercadopago.configure({
    //   sandbox: false,
    //   access_token: "APP_USR-3967596500928054-020703-58d66af4da4675b3a2c2c5ed3d5ca6d2-94662750",
    // });

    // console.log("mercadopago", mercadopago);

    const tipo = "producto";

    // Moneda
    context.result.moneda = "ARS";

    // Productos
    let productos = context.result.productos;

    console.log("CONTEXT-RESULT >", context.result);

    // Email del comprador
    let email = context.result.email;

    // Buscar el precio de cada producto y sumarlos
    if (tipo === "producto") {
      for (let i = 0; i < productos.length; i++) {
        let precio = await context.app.service("products").get(productos[i].id);
        productos[i].precio = precio.price;
      }
    } else {
      console.log("no es un producto");
      const error = new Error("No es un producto");
      throw error;
    }

    let total = 0;
    // Sumar los precios con también la cantidad
    for (let i = 0; i < productos.length; i++) {
      total += productos[i].precio * productos[i].quantity;
    }

    // Si hay cupón, aplicar descuento
    if (context.result.cupon && context.result.cupon.estado === true) {
      let cupon = context.result.cupon;
      let descuento = (total * cupon.descuento) / 100;
      total -= descuento;
    }

    context.result.total = total;

    // Agregar descripción a los productos
    for (let i = 0; i < productos.length; i++) {
      let precio = await context.app.service("products").get(productos[i].id);
      productos[i].precio = precio.price;
      productos[i].description = productos[i].content;
    }

    // Función para generar Order ID
    function generateOrderId() {
      const randomNum = crypto.randomInt(0, 1000);
      const formattedNum = randomNum.toString().padStart(5, "0");
      return `UL-${formattedNum}`;
    }

    let orderId = generateOrderId();

    const costoEnvio = 2000;

    // Crear pago en el servicio de pagos
      let res = await context.app.service("payments").create({
        email: email,
        productos: context.result.productos,
        total,
        moneda: "ARS",
        tipo: context.result.tipo,
        estado: "pendiente",
        orderId,
        precioEnvio: costoEnvio,
        envio: context.result.envio,
        cupon: context.result.cupon,
        emailEnviado: false,
      });
    

    

    let id_pago = res._id;
    console.log("id_pago", id_pago);

    const items = context.result.productos.map((producto, index) => {
      return {
        id: index,
        title: "Productos",
        quantity: producto.quantity,
        currency_id: "ARS",
        unit_price: producto.precio,
      };
    });

    // Si la compra supera los 15000 el envío es gratis
    let envio = 2000;
    if (total >= 15000) {
      envio = 0;
    }

    total += envio;

    const preference = {
      items: [
        {
          id: 1,
          title: "Armor Template",
          quantity: 1,
          currency_id: "ARS",
          unit_price: total,
        },
      ],
      back_urls: {
        pending: "https://armortemplate.com/",
        failure: "https://armortemplate.com/",
        success: `https://armortemplate.com/products/gracias/${id_pago}`,
        pending: `https://armortemplate.com/products/gracias/${id_pago}`,
        failure: `https://armortemplate.com/products/gracias/${id_pago}`,
      },
      auto_return: "approved",
      external_reference: JSON.stringify(id_pago),
      notification_url: "https://api.armortemplate.com/mercadopago",
    };

    // let linkDePago = await mercadopago.preferences.create(preference);
    let linkDePago = await createMercadoPagoPreference(token, preference);

    context.result.linkDePago = linkDePago;

    let payment = await context.app.service("payments").patch(id_pago, {
      id_comprador: context.data.id_comprador,
      id_vendedor: "no se sabe",
      productos: context.result.productos,
      linkDePago: linkDePago,
      estado: "pendiente",
      id_user: JSON.stringify(id_pago),
      email: email,
      estado: "pendiente",
    });

    console.log("payment", payment);

    context.result = {
      linkDePago: linkDePago,
      id_pago: id_pago,
      total: total,
    };

    return context;
  };
};
