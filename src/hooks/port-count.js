module.exports = (options = {}) => {
  return async context => {
    const { app, service, data } = context;
    const maxHostPort = 1200; // Límite máximo para hostPort
    const minHostPort = 1001; // Valor inicial para hostPort

    try {
      // Obtén la cantidad de documentos en la colección 'applications'
      const applicationCount = await service.Model.countDocuments({});

      // Calcula el nuevo valor para 'hostPort'
      const newHostPort = minHostPort + applicationCount;

      // Verifica que el nuevo valor esté dentro del rango permitido
      if (newHostPort <= maxHostPort) {
        data.hostPort = newHostPort;
        return context;
      } else {
        throw new Error('Se alcanzó el límite máximo para hostPort.');
      }
    } catch (error) {
      throw new Error('No se pudo obtener la cantidad de documentos en la colección applications.', {
        errors: error
      });
    }
  };
};
