const axios = require("axios");

module.exports = (options = {}) => {
  return async (context) => {
    const data = context.data;
    context.data.link = "https://" + data.subdomain + ".armortemplate.site";
    context.data.status = "creating";

    //modelo restaurante default.
    context.data.restaurant = {
      active: true,
      forceHome: true,
      title: "Menu Restaurant by Armor Template",
      instagram: "",
      location: "",
      telephone: 0,
      email: "",
      background_image: "https://armortemplate.site/images/blanco-hojas-verdes.jpg",
      banner_image: "https://armortemplate.site/images/zanahorias.jpg"
    };
  
    context.data.plugins = {
      mercadopago: {
        mercadopago_token: "",
      },
    };
  
    let sett = await axios.get("https://api.armortemplate.site/settings/", {
      query: {
        $limit: 1,
      },
    });
  
    let setting = sett.data;
    setting = setting.data[0];
    context.data.version = setting.version;

    try {
      // Verifica si ya existe un puerto con el subdominio dado
      const existingPort = await context.app.service("ports").find({
        query: {
          subdomain: data.subdomain,
          $limit: 1,
        },
      });

      // Si el subdominio ya existe, lanza un error
      if (existingPort.total > 0 && existingPort.data.length > 0) {
        throw new Error(`El subdominio '${data.subdomain}' ya está en uso.`);
      }

      // Obtén todos los puertos ya utilizados
      const ports = await context.app.service("ports").find({
        query: {
          $limit: 1000, // Obtenemos una gran cantidad para verificar muchos puertos
        },
      });

      // Filtra los puertos ya en uso para buscar dentro de los rangos deseados
      const usedApiPorts = ports.data.map((p) => p.api_port);
      const usedFrontendPorts = ports.data.map((p) => p.frontend_port);

      // Función para encontrar un puerto libre en un rango
      const findFreePort = (start, end, usedPorts) => {
        for (let i = start; i <= end; i++) {
          if (!usedPorts.includes(i)) {
            return i;
          }
        }
        return null; // Si no se encuentra puerto libre
      };

      // Busca un puerto libre en el rango 1000-1999 para la API
      const port_api = findFreePort(1000, 1999, usedApiPorts);
      if (!port_api) {
        throw new Error("No hay puertos API disponibles en el rango 1000-1999");
      }

      // Busca un puerto libre en el rango 2000-2999 para el frontend
      const port_frontend = findFreePort(2000, 2999, usedFrontendPorts);
      if (!port_frontend) {
        throw new Error("No hay puertos frontend disponibles en el rango 2000-2999");
      }

      console.log("port_api", port_api);
      console.log("port_frontend", port_frontend);

      try {
        // Crea la entrada de puertos en la base de datos
        const setPorts = await context.app.service("ports").create({
          api_port: port_api,
          frontend_port: port_frontend,
          subdomain: data.subdomain,
        });
        console.log("setPorts", setPorts);
        context.data.ports_id = setPorts._id;
        context.data.ports = setPorts;
      } catch (error) {
        console.log("error", error);
        throw new Error("No se pudo asignar los puertos");
      }

      return context;
    } catch (error) {
      console.log("Error:", error.message);
      throw new Error("Error al crear la aplicación: " + error.message);
    }
  };
};
