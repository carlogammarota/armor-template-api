// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const axios = require("axios");
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
    return async context => {
        if (!context.params.user) {
            throw new Error("No estas autenticado");
        }

        const events = await context.app.service("events").get(context.id);
        console.log("events", events);

        let usuarioCreador = events.user._id;
        let usuarioLogueado = context.params.user._id;

         //convertir a string
         usuarioCreador = usuarioCreador.toString();
         usuarioLogueado = usuarioLogueado.toString();


        //si el usuario tiene el permiso de admin lo deja pasar
        if (context.params.user.permissions.includes("admin")) {
            console.log("tiene permisos de admin");
            return context;
        }

        if (usuarioCreador !== usuarioLogueado) {
            throw new Error("No eres el usuario creador");
        }
    };
};
