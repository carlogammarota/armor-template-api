module.exports = (options = {}) => {
  return async context => {
    const { app, service, data } = context;

    
    //si el subdominio ya esta en uso no se puede crear
    const subdomain = data.subdomain;

    const subdomainExists = await service.find({
      query: {
        subdomain
      }
    });

    if(subdomainExists.total > 0){
      throw new Error('Subdomain already exists');
    }
  };
};
