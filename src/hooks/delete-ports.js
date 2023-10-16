// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    console.log("delete-app", context.data)
    try {
      const deletePorts = await context.app.service("ports").remove(context.data.ports_id);
      console.log("deletePorts", deletePorts);
      return context;
    } catch (error) {
      console.log("error", error);
      return {
        message: "Error al eliminar la aplicación",
      }
    }
    

  };
};
