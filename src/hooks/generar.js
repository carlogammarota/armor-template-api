/* eslint-disable no-dupe-keys */
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

    // Configurar MercadoPago
    mercadopago.configure({
      sandbox: false,
      access_token: token,
    });

    const tipo = context.result.tipo;
    context.result.moneda = "ARS";
    let productos = context.result.productos;
    let email = context.result.email;

    if (tipo !== "producto") {
      throw new Error("No es un producto");
    }

    // Obtener precios de los productos
    for (let i = 0; i < productos.length; i++) {
      let precio = await context.app.service("products").get(productos[i].id);
      productos[i].precio = precio.price;
      productos[i].description = productos[i].content;
    }

    // Calcular total de productos
    let totalDeProductos = productos.reduce((acc, item) => acc + item.precio * item.quantity, 0);

    // Aplicar descuento si hay cupón
    // let descuento = 0;
    // if (context.result.cupon && context.result.cupon.estado) {
    //   descuento = (totalDeProductos * context.result.cupon.descuento) / 100;
    //   totalDeProductos -= descuento;
    // }

    // Añadir costo de envío si el total es menor a 15000
    let costoEnvio = totalDeProductos < 15000 ? 2000 : 0;
    let total = totalDeProductos + costoEnvio;

    // Generar ID de la orden
    function generateOrderId() {
      const randomNum = crypto.randomInt(0, 1000);
      return `UL-${randomNum.toString().padStart(5, "0")}`;
    }

    let orderId = generateOrderId();

    // Crear pago en el servicio de pagos
    let res = await context.app.service("payments").create({
      email,
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

    // Preparar ítems para MercadoPago
    const items = context.result.productos.map((producto, index) => ({
      id: index,
      title: producto.description || "Producto",
      quantity: producto.quantity,
      currency_id: "ARS",
      unit_price: producto.precio,
    }));

    // Crear preferencia de pago en MercadoPago
    const preference = {
      items,
      back_urls: {
        success: `https://aura-producciones.com/gracias/${id_pago}`,
        pending: `https://aura-producciones.com/gracias/${id_pago}`,
        failure: `https://aura-producciones.com/gracias/${id_pago}`,
      },
      auto_return: "approved",
      external_reference: JSON.stringify(id_pago),
      notification_url: "https://0d38-181-111-47-180.ngrok-free.app/mercadopago",
    };

    let linkDePago = await mercadopago.preferences.create(preference);
    context.result.linkDePago = linkDePago.response.init_point;

    // Actualizar el pago en el servicio de pagos
    await context.app.service("payments").patch(id_pago, {
      id_comprador: context.data.id_comprador,
      id_vendedor: "no se sabe",
      productos: context.result.productos,
      linkDePago: linkDePago.response.init_point,
      estado: "pendiente",
      id_user: JSON.stringify(id_pago),
      email,
    });

    context.result = {
      linkDePago: linkDePago.response.init_point,
      id_pago: id_pago,
      total: total,
    };

    return context;
  };
};
