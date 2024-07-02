// eslint-disable-next-line no-dupe-keys
/* eslint-disable no-undef */
/* eslint-disable no-unreachable */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const mercadopago = require("mercadopago");
axios = require("axios");
const crypto = require("crypto");
const express = require("express");
const bodyParser = require("body-parser");

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

    //por el momento harcodeamos el token
    // token =
    //   "APP_USR-5050283024010521-080117-1be3cde8e474088c42201a3722be9673-1304411976";

    // Configurar MercadoPago
    mercadopago.configure({
      sandbox: false,
      access_token: token,
    });

    const tipo = context.result.tipo;

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
      envio: costoEnvio,
      cupon: context.result.cupon,
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
          title: "Sabores Del Monte",
          quantity: 1,
          currency_id: "ARS",
          unit_price: total,
        },
      ],
      back_urls: {
        pending: "https://saboresdelmonte.com/",
        failure: "https://saboresdelmonte.com/",
        success: `https://saboresdelmonte.com/products/gracias/${id_pago}`,
        pending: `https://saboresdelmonte.com/products/gracias/${id_pago}`,
        failure: `https://saboresdelmonte.com/products/gracias/${id_pago}`,
      },
      auto_return: "approved",
      external_reference: JSON.stringify(id_pago),
      notification_url: "https://api-server.saboresdelmonte.com/mercadopago",
    };

    let linkDePago = await mercadopago.preferences.create(preference);
    context.result.linkDePago = linkDePago.response.init_point;

    let payment = await context.app.service("payments").patch(id_pago, {
      id_comprador: context.data.id_comprador,
      id_vendedor: "no se sabe",
      productos: context.result.productos,
      linkDePago: linkDePago.response.init_point,
      estado: "pendiente",
      id_user: JSON.stringify(id_pago),
      email: email,
      estado: "pendiente",
    });

    console.log("payment", payment);

    context.result = {
      linkDePago: linkDePago.response.init_point,
      id_pago: id_pago,
      total: total,
    };

    return context;
  };
};
