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
      //  console.log('Preference created:', response.data);
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
    try {


      // Configuración de MercadoPago
      const settings = await context.app.service("settings").find();

      const dominio = settings.data[0].subdomain

      console.log("DOMINIO", dominio);

      const dominioCompleto = "";

      if (dominio === "localhost") {
        dominioCompleto = `http://localhost:3030`;
      }

      if (dominio === "armortemplate.com") {
        dominioCompleto = `https://armortemplate.com`;
      }

      




      const token = settings.data[0].plugins.mercadopago.mercadopago_token || "APP_USR-3339336448677361-041601-091aece8a0c670acde2ef5048390f69e-94662750";
      // console.log("TOKEN", token);

      // Obtener detalles del contexto
      let { envio, total, direccion, email, productos, cupon, carrito } = context.result;

      // Moneda
      context.result.moneda = "ARS";

      // Validar tipo de transacción
      const tipo = "producto";
      if (tipo !== "producto") {
        throw new Error("No es un producto");
      }

      // console.log("TOTAL", total);


      
      


      // Aplicar descuento si hay cupón válido
      // if (cupon?.estado) {
      //   const descuento = (total * cupon.descuento) / 100;
      //   total -= descuento;
      // }




      // context.result.total = total;

      // Generar Order ID
      const orderId = `UL-${crypto.randomInt(0, 1000).toString().padStart(5, "0")}`;
     

      // console.log("productos", productos);


     



      const totalEnProductos = productos.map((producto, index) => ({
        id: index,
        title: "Productos",
        quantity: producto.product.quantity,
        currency_id: "ARS",
        unit_price: producto.product.price,
      }));


      // Crear registro de pago
      const paymentData = {
        email,
        productos,
        total,
        moneda: "ARS",
        tipo,
        estado: "pendiente",
        orderId,
        precioEnvio: envio,
        envio: envio,
        cupon,
        direccion,
        emailEnviado: false,
      };
      const paymentResponse = await context.app.service("payments").create(paymentData);
      const id_pago = paymentResponse._id;
      // console.log("id_pago", id_pago);

      // Crear preferencia de pago para MercadoPago
      const preference = {
        items: [{
          id: 1,
          title: "Productos",
          quantity: 1,
          currency_id: "ARS",
          unit_price: total,
          // {
          //   id: 1,
          //   title: "Productos",
          //   quantity,
          //   currency_id: "ARS",
          //   unit_price: total,
          // },
          // {
          //   id: 2,
          //   title: "Envío",
          //   quantity: 1,
          //   currency_id: "ARS",
          //   unit_price: costoEnvio,
          // },
        }],
        back_urls: {
          pending: `https://armortemplate.com/success/${id_pago}`,
          failure: `https://armortemplate.com/success/${id_pago}`,
          success: `https://armortemplate.com/success/${id_pago}`,
        },
        auto_return: "approved",
        external_reference: JSON.stringify(id_pago),
        notification_url: "https://api.armortemplate.com/mercadopago",
      };

      const linkDePago = await createMercadoPagoPreference(token, preference);
      context.result.linkDePago = linkDePago;

      // Actualizar el estado del pago en la base de datos
      await context.app.service("payments").patch(id_pago, {
        id_comprador: context.data.id_comprador,
        id_vendedor: "no se sabe",
        productos,
        linkDePago,
        estado: "pendiente",
        id_user: JSON.stringify(id_pago),
        email,
      });

      // Responder con los datos necesarios
      context.result = {
        linkDePago,
        id_pago,
        total,
      };

      return context;
    } catch (error) {
      console.error("Error en el procesamiento del pago:", error);
      throw error;
    }
  };
};
