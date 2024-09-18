// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const axios = require("axios");

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    // console.log("remove-app", context.id)

    const id = context.id;

    // console.log("update-app", context);

    let application = await axios.get(
      `https://api.armortemplate.site/applications/${id}`
    );

    application = application.data;

    console.log("application", application);

    let data = await axios.get("https://api.armortemplate.site/settings/", {
        query: {
          $limit: 1,
        }
    });

    let setting = data.data
    setting = setting.data[0];
    
    console.log("setting", setting);


    return 0
    


    // console.log("settings", data);
    
    application.version = setting.version;



    const subdomain = application.subdomain;

    console.log("subdomain", subdomain);


    const userOwner = application.user._id;

    const userApp = context.params.user._id;

    const permissions = context.params.user.permissions;

    //si no es el dueño del app, devolver error al menos que tebga permisos de admin

    if (userOwner != userApp && permissions.indexOf("admin") == -1) {
      throw new Error("No tienes permisos para actualizar esta aplicación");
    }



    const updateApp = await axios.post(
      `https://docker.armortemplate.site/update-app`,
      {
        subdomain: subdomain,
        password: "luci2024",
      }
    );

    console.log("updateApp", updateApp);

    context.result = {
      message: "Aplicación actualizada",
    };

    return context;
  };
};
