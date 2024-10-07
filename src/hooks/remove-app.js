// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const axios = require("axios");

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    // console.log("remove-app", context.id)

    const id = context.id;

    // https://api.armortemplate.com/applications/

    const application = await axios.get(
      `https://api.armortemplate.com/applications/${id}`
    );

    const subdomain = application.data.subdomain;

    const userOwner = application.data.user._id;

    const userApp = context.params.user._id;

    const permissions = context.params.user.permissions;

    //si no es el dueño del app, devolver error al menos que tebga permisos de admin
    if (userOwner != userApp && permissions.indexOf("admin") == -1) {
      throw new Error("No tienes permisos para eliminar esta aplicación");
    } else {
      const deleteApp = await axios.post(
        `https://docker.armortemplate.com/delete-application`,
        {
          subdomain: subdomain,
          password: "luci2024",
          delete_database: true,
        }
      );

      console.log("deleteApp", deleteApp);
    }

    context.result = {
      message: "Aplicación eliminada",

    };

    // return {
    //   message: "Aplicación eliminada",
    // }

    return context;
  };
};
