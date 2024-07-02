/* eslint-disable no-inner-declarations */
/* eslint-disable no-unused-vars */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const mercadopago = require("mercadopago");
const util = require("util");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
// mercadopago.configure({
//   sandbox: false, // si estás probando en el ambiente de pruebas de MercadoPago

//   //la idea es sacar el accces token de la base de datos settings

//   // access_token: 'APP_USR-8509403097579740-051601-e1c674ca876a173dd84e3b63a2ac3d6e-1375519379'

//   //produccion
//   // access_token: 'APP_USR-3967596500928054-020703-58d66af4da4675b3a2c2c5ed3d5ca6d2-94662750'
//   // aquí debes colocar tu Client Secret

//   // para test
//   // access_token: 'APP_USR-5050283024010521-080117-1be3cde8e474088c42201a3722be9673-1304411976'

//   //cuenta ro
//   access_token:
//     "APP_USR-2354878281626192-122521-a41bf257a1dd84f3f5edc648a49d806a-1042694053",
// });

const nodemailer = require("nodemailer");
// const axios = require('axios');
const readFile = util.promisify(fs.readFile);
const usersArray = [];
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const id_ticket = null;

//enviar email
async function enviarCorreo(pago) {
  // Configuración del transporte del correo electrónico
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: "carlo.gammarota@gmail.com",
      pass: "wv5Xn140CbZDW9HR", // Considera usar variables de entorno para manejar las credenciales de forma segura
    },
  });
  try {
    // Leer el archivo HTML como una cadena de texto
    let htmlContent = await readFile("./email.html", "utf8");

    // Formatear la lista de productos
    let productosHtml = pago.productos
      .map(
        (producto) => `
      <div class="flex justify-between items-center border-b border-gray-200 pb-2">
        <span class="text-gray-600">${producto.product.title}</span>
        <span class="text-gray-600">Cantidad: ${producto.quantity}</span>
        <span class="text-gray-900">${producto.product.price} ARS</span>
      </div>
    `
      )
      .join("");

    // Reemplazar los marcadores de posición en el HTML con datos reales
    let customizedHtml = htmlContent
      .replace("{{nombre}}", pago.envio.nombre)
      .replace("[id_compra]", pago.orderId)
      .replace("[correo]", pago.email)
      .replace("[totalEnProductos]", pago.total)
      .replace("[envio]", 2000 + "ARS")
      .replace("[total]", pago.total + 2000)
      .replace("[estado]", pago.estado)
      .replace("[fecha]", new Date(pago.createdAt).toLocaleDateString())
      .replace("[productos]", productosHtml)
      .replace("[fecha_entrega]", pago.envio.diaEnvio)
      .replace("[hora_entrega]", pago.envio.diaEnvio);

    //si el total supero los 15.000 el envio es gratis
    if (pago.total > 15000) {
      customizedHtml = customizedHtml.replace("[envio]", 0 + " ARS");
      customizedHtml = customizedHtml.replace("[total]", pago.total);
    }

    // <div style="margin-top: 1.25rem">
    //   <a
    //     href="${pago.linkDePago}"
    //     style="
    //                                 display: inline-block;
    //                                 padding-left: 1.5rem;
    //                                 padding-right: 1.5rem;
    //                                 padding-top: 0.625rem;
    //                                 padding-bottom: 0.625rem;
    //                                 background-color: #2563eb;
    //                                 color: #ffffff;
    //                                 font-weight: 500;
    //                                 font-size: 0.75rem;
    //                                 text-transform: uppercase;
    //                                 border-radius: 0.25rem;
    //                                 box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    //                                 transition: background-color 0.15s
    //                                     ease-in-out,
    //                                   box-shadow 0.15s ease-in-out;
    //                               "
    //   >
    //     Pagar Ahora
    //   </a>
    // </div>;
    //en estado pago dependiendo del estado se muestra un boton para pagar o un mensaje de aprobado o rechazado
    let botonPago = "";
    if (pago.estado == "pendiente") {
      botonPago = `
      <div style="margin-top: 1.25rem">
        <a
          href="${pago.linkDePago}"
          style="
              display: inline-block;
              padding-left: 1.5rem;
              padding-right: 1.5rem;
              padding-top: 0.625rem;
              padding-bottom: 0.625rem;
              background-color: #2563eb;
              color: #ffffff;
              font-weight: 500;
              font-size: 0.75rem;
              text-transform: uppercase;
              border-radius: 0.25rem;
              box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
              transition: background-color 0.15s


              ease-in-out,



                box-shadow 0.15s ease-in-out;
                                    " 
        >

          Pagar Ahora
        </a>
      </div>
    `;
    } else if (pago.estado == "aprobado") {
      botonPago = `
      <div style="margin-top: 1.25rem">
        
        <p style="color: #2563eb; font-weight: 500; font-size: 0.75rem; text-transform: uppercase;">
          Pago Aprobado
        </p>
      </div>
    `;
    } else if (pago.estado == "rechazado") {
      botonPago = `
      <div style="margin-top: 1.25rem">

        <p style="color: #2563eb; font-weight: 500; font-size: 0.75rem; text-transform: uppercase;">
          Pago Rechazado
        </p>
      </div>
    `;
    } else if (pago.estado == "en proceso") {
      botonPago = `
      <div style="margin-top: 1.25rem">

        <p style="color: #2563eb; font-weight: 500; font-size: 0.75rem; text-transform: uppercase;">
          Pago en Proceso
        </p>
      </div>
    `;
    }

    customizedHtml = customizedHtml.replace("[estado_pago]", botonPago);

    // Detalles del correo electrónico
    const mailOptions = {
      from: "carlo.gammarota@gmail.com",
      to: pago.email,
      subject: "Sabores del Monte - Detalles de tu compra",
      html: customizedHtml,
    };

    // Envío del correo electrónico
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado:", info.response);
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
  }
}

module.exports = (options = {}) => {
  return async (context) => {
    //configuracion mercadopago

    //el accestoken esta en el servicio settings[0] en plugins.mercadopago.mercadopago_token

    //pensado para implementar pronto
    let settings = await context.app.service("settings").find();
    let token = settings.data[0].plugins.mercadopago.mercadopago_token;

    mercadopago.configure({
      sandbox: false, // si estás probando en el ambiente de pruebas de MercadoPago

      //la idea es sacar el accces token de la base de datos settings

      // access_token: 'APP_USR-8509403097579740-051601-e1c674ca876a173dd84e3b63a2ac3d6e-1375519379'

      //produccion
      // access_token: 'APP_USR-3967596500928054-020703-58d66af4da4675b3a2c2c5ed3d5ca6d2-94662750'
      // aquí debes colocar tu Client Secret

      // para test
      // access_token: 'APP_USR-5050283024010521-080117-1be3cde8e474088c42201a3722be9673-1304411976'

      //cuenta ro
      // access_token:
      //   "APP_USR-2354878281626192-122521-a41bf257a1dd84f3f5edc648a49d806a-1042694053",

      access_token: token,
    });

    let req = context.params;

    // console.log('Webhook:', req);

    if (req.query.topic == "merchant_order") {
      console.log("Orden de compra");
      let merchant_order = await mercadopago.merchant_orders.get(req.query.id);

      // console.log('merchant_order', merchant_order);

      let payments = merchant_order.response.payments;

      let id_pago = merchant_order.response.external_reference.replace(
        /"/g,
        ""
      );

      // console.log('payments', payments.id);

      // let paymentId = payments.id;
      // let generarEntrega = false;

      for (let index = 0; index < payments.length; index++) {
        const payment = payments[index];

        if (
          payment.status == "approved" &&
          payment.status_detail == "accredited"
        ) {
          console.log("El pago fue exitoso !!!!");

          let id_pago = merchant_order.response.external_reference.replace(
            /"/g,
            ""
          );
          // console.log('merchant_order.response', id_pago);

          //  let paymentNew = await context.app.service('payments').patch(id_pago ,{
          //    estado: 'aprobado',
          //    // id_orden: external_reference_variable
          //  })

          // console.log('paymentNew', paymentNew);

          // let pago = await context.app.service('payments').get(id_pago);
          // console.log('estadoooooooooooooo', pago.estado);

          // if(pago.estado == !'aprobado'){
          // console.log('entroooooooooooooooooooooooooooooooo
          // try {
          let pago = await context.app.service("payments").get(id_pago);

          console.log(payment);
          console.log(payment);
          await context.app.service("payments").patch(id_pago, {
            estado: "aprobado",
            // linkDePago: "https://armortemplate.com/gracias/" + id_pago,
            detalle: payment,
            //con el payment.id se puede obtener el comprobante de pago

            // linkDePago: payment.transaction_details.external_resource_url,
          });

          enviarCorreo(pago);

          const id_cupon = pago.id_cupon;

          //restarle 1 a cantidad_disponible en servicio cupon
          let cupon = await context.app.service("cupones").get(id_cupon);
          let nueva_cantidad_disponible = cupon.cantidad_disponible - 1;
          await context.app.service("cupones").patch(id_cupon, {
            cantidad_disponible: nueva_cantidad_disponible,
          });

          // Ejemplo de llamada a la función (asegúrate de definir 'pago' y 'linksHtml')
          // enviarCorreo(pago, "Link de Descarga");

          // } catch (error) {
          //   console.log("error", error);
          // }
        }
        if (payment.status == "rejected") {
          console.log("El pago fue rechazado");

          try {
            await context.app.service("payments").patch(id_pago, {
              estado: "rechazado",
              // id_orden: external_reference_variable
            });

            //enviar email de rechazo
            let pago = await context.app.service("payments").get(id_pago);
            enviarCorreo(pago);
            // console.log('paymentNew', paymentNew);
          } catch (error) {
            console.log("error", error);
          }
        }

        if (payment.status == "pending") {
          console.log("El pago esta pendiente");
          try {
            await context.app.service("payments").patch(id_pago, {
              estado: "pendiente",
              // id_orden: external_reference_variable
            });
            // console.log('paymentNew', paymentNew);
          } catch (error) {
            console.log("error", error);
          }
        }
        //in_process
        if (payment.status == "in_process") {
          console.log("El pago esta en proceso");
          try {
            await context.app.service("payments").patch(id_pago, {
              estado: "en proceso",
              // id_orden: external_reference_variable
            });
            console.log("paymentNew", paymentNew);
          } catch (error) {
            console.log("error", error);
          }
        }
      }
    }

    return context;
  };
};
