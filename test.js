const nodemailer = require("nodemailer");
//enviar email
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const axios = require("axios");

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

   const productos = [
    {
        "id": "650a4ef9aa90981d7714632b",
        "quantity": 3,
        "product": {
            "_id": "650a4ef9aa90981d7714632b",
            "images": [
                "https://res.cloudinary.com/doznjtpmk/image/upload/v1695510248/admin-web/q3dkqhvagofstgxdzpbi.avif",
                "https://res.cloudinary.com/doznjtpmk/image/upload/v1695510253/admin-web/ye5hupjjm7gl7mlrwkxf.avif",
                "https://res.cloudinary.com/doznjtpmk/image/upload/v1695510259/admin-web/nb7bdqy6koj9ne7ycpwg.jpg"
            ],
            "title": "Performance Quarter-Zip Jacket",
            "content": "<p>Stay warm and active in our performance quarter-zip jacket. Made with moisture-wicking fabric and a breathable design, this jacket is perfect for outdoor sports and workouts. The quarter-zip feature allows for easy ventilation, and the sleek, sporty look ensures you stay on-trend while staying active.</p>",
            "price": 10,
            "category": {
                "_id": "66cd3b88b5427fefa532b5a1",
                "title": "Clothing & Apparel",
                "description": "\"Clothing & Apparel\" is your one-stop shop for the latest fashion trends and styles. Discover a wide range of clothing options for men, women, and children, from casual wear to formal attire. Whether you're looking for everyday basics, seasonal essentials, or statement pieces, this category offers a diverse selection to suit every taste and budget. Stay stylish and comfortable with our curated collection of high-quality garments. Start shopping today and elevate your wardrobe with \"Clothing & Apparel\"!",
                "image": "https://res.cloudinary.com/doznjtpmk/image/upload/v1724726148/admin-web/zgxevpb1xsrgo22b1ery.webp",
                "slug": "clothing-apparel",
                "createdAt": "2024-08-27T02:35:52.679Z",
                "updatedAt": "2024-08-27T07:39:30.856Z",
                "__v": 0,
                "subcategories": [
                    "T-Shirts",
                    "Shirts",
                    "Blouses",
                    "Pants",
                    "Jeans",
                    "Shorts",
                    "Dresses",
                    "Skirts",
                    "Jackets",
                    "Coats",
                    "Sweaters",
                    "Hoodies",
                    "Suits",
                    "Blazers",
                    "Swimwear",
                    "Lingerie",
                    "Underwear",
                    "Socks",
                    "Activewear",
                    "Sleepwear",
                    "Outerwear",
                    "Accessories",
                    "Hats",
                    "Scarves",
                    "Gloves",
                    "Belts",
                    "Ties",
                    "Footwear",
                    "Sandals",
                    "Sneakers",
                    "Boots",
                    "Slippers",
                    "Flip Flops"
                ]
            },
            "metaData": {
                "title": "Performance Quarter-Zip Jacket",
                "content": "Stay warm and active in our performance quarter-zip jacket. Made with moisture-wicking fabric and a breathable design, this jacket is perfect for outdoor sports and workouts. The quarter-zip feature allows for easy ventilation, and the sleek, sporty look ensures you stay on-trend while staying active.",
                "img": "https://res.cloudinary.com/doznjtpmk/image/upload/v1695510300/admin-web/hncqydxqe1t5icj7vmij.jpg"
            },
            "createdAt": "2023-09-20T01:46:33.904Z",
            "updatedAt": "2024-10-03T19:04:30.180Z",
            "__v": 0,
            "categoryId": "66cd3b88b5427fefa532b5a1",
            "subcategory": "Shirts",
            "slug": "performance-quarter-zip-jacket",
            "type": "product",
            "user": {
                "_id": "64ff9e2bfdad8a3c118b5e72",
                "permissions": [
                    "dev",
                    "admin",
                    "dashboard",
                    "products",
                    "events",
                    "blogs",
                    "categories",
                    "applications",
                    "settings",
                    "scraping",
                    "users",
                    "delete-users",
                    "edit-users",
                    "mercadopago",
                    "subscribe",
                    "restaurant"
                ],
                "email": "admin@gmail.com",
                "createdAt": "2023-09-11T23:09:31.293Z",
                "updatedAt": "2024-09-09T17:07:50.459Z",
                "__v": 0,
                "address": "Av. Jose Suarez 321",
                "city": "Las Vegas Nevada",
                "lastname": "Pro",
                "name": "Admin",
                "telephone": "543548637435",
                "image": "https://res.cloudinary.com/doznjtpmk/image/upload/v1694564429/admin-web/nimexmkkkvkbs93uq6mb.png",
                "content": ""
            },
            "user_id": "64ff9e2bfdad8a3c118b5e72",
            "quantity": 1,
            "isInCart": true
        }
    },
    {
        "id": "66fedca1eb674eca78e99b6f",
        "quantity": 4,
        "product": {
            "_id": "66fedca1eb674eca78e99b6f",
            "images": [
                "https://res.cloudinary.com/doznjtpmk/image/upload/v1727978641/admin-web/nsztfbv7r6lz7shj84hc.webp"
            ],
            "categoryId": "66cd3b88b5427fefa532b5a1",
            "subcategory": "T-Shirts",
            "user_id": "64ff9e2bfdad8a3c118b5e72",
            "user": {
                "_id": "64ff9e2bfdad8a3c118b5e72",
                "permissions": [
                    "dev",
                    "admin",
                    "dashboard",
                    "products",
                    "events",
                    "blogs",
                    "categories",
                    "applications",
                    "settings",
                    "scraping",
                    "users",
                    "delete-users",
                    "edit-users",
                    "mercadopago",
                    "subscribe",
                    "restaurant"
                ],
                "email": "admin@gmail.com",
                "createdAt": "2023-09-11T23:09:31.293Z",
                "updatedAt": "2024-09-09T17:07:50.459Z",
                "__v": 0,
                "address": "Av. Jose Suarez 321",
                "city": "Las Vegas Nevada",
                "lastname": "Pro",
                "name": "Admin",
                "telephone": "543548637435",
                "image": "https://res.cloudinary.com/doznjtpmk/image/upload/v1694564429/admin-web/nimexmkkkvkbs93uq6mb.png",
                "content": ""
            },
            "metaData": {
                "title": "Meta Title",
                "content": "Meta Description",
                "img": ""
            },
            "category": {
                "_id": "66cd3b88b5427fefa532b5a1",
                "title": "Clothing & Apparel",
                "description": "\"Clothing & Apparel\" is your one-stop shop for the latest fashion trends and styles. Discover a wide range of clothing options for men, women, and children, from casual wear to formal attire. Whether you're looking for everyday basics, seasonal essentials, or statement pieces, this category offers a diverse selection to suit every taste and budget. Stay stylish and comfortable with our curated collection of high-quality garments. Start shopping today and elevate your wardrobe with \"Clothing & Apparel\"!",
                "image": "https://res.cloudinary.com/doznjtpmk/image/upload/v1724726148/admin-web/zgxevpb1xsrgo22b1ery.webp",
                "slug": "clothing-apparel",
                "createdAt": "2024-08-27T02:35:52.679Z",
                "updatedAt": "2024-08-27T07:39:30.856Z",
                "__v": 0,
                "subcategories": [
                    "T-Shirts",
                    "Shirts",
                    "Blouses",
                    "Pants",
                    "Jeans",
                    "Shorts",
                    "Dresses",
                    "Skirts",
                    "Jackets",
                    "Coats",
                    "Sweaters",
                    "Hoodies",
                    "Suits",
                    "Blazers",
                    "Swimwear",
                    "Lingerie",
                    "Underwear",
                    "Socks",
                    "Activewear",
                    "Sleepwear",
                    "Outerwear",
                    "Accessories",
                    "Hats",
                    "Scarves",
                    "Gloves",
                    "Belts",
                    "Ties",
                    "Footwear",
                    "Sandals",
                    "Sneakers",
                    "Boots",
                    "Slippers",
                    "Flip Flops"
                ]
            },
            "slug": "camiseta-argentina-como-nueva-2",
            "price": 200,
            "title": "Camiseta Argentina Como nueva",
            "color": "#DE1B1B",
            "content": "<p>Content of the editor.</p>",
            "model": "Nike",
            "createdAt": "2024-10-03T18:04:17.866Z",
            "updatedAt": "2024-10-03T19:07:13.866Z",
            "__v": 0,
            "type": "product",
            "quantity": 1,
            "isInCart": true
        }
    }
];
    const productosHtml = productos.map((producto) => `
    <tr>
        <td class="py-2">
            <img src="${producto.product.images[0]}" width="50" alt="${producto.product.title}">
        </td>
        <td class="py-2">
            <strong>${producto.product.title}</strong>
            <p class="text-slate-500">Cantidad: ${producto.quantity}</p>
        </td>
        <td class="py-2 text-right">
            ARS $ ${producto.product.price}
        </td>
    </tr>
    `).join("");

    // Reemplazar los marcadores de posición en el HTML con datos reales


    // // Reemplazar los marcadores de posición en el HTML con datos reales
     let customizedHtml = htmlContent

    //estos!!
     .replace("[productos]", productosHtml)
        .replace("[envio]", pago.precio_envio + "ARS")
      .replace("[total]", pago.total)



    

    // Detalles del correo electrónico
    const mailOptions = {
      from: "carlo.gammarota@gmail.com",
      to: 'carlo.gammarota@gmail.com',
    //   to: pago.email,
      subject: "Compra realizada",
      html: customizedHtml,
    };

    // Envío del correo electrónico
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado:", info.response);
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
  }
}

//6716f7e27090ba19ce4bd043

enviarCorreo('6716f7e27090ba19ce4bd043');
