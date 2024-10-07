
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
    return async context => {
        if (!context.params.user) {
            throw new Error("No estas autenticado");
        }


        //si es admin lo deja pasar
        if (context.params.user.permissions.includes("admin")) {
            return context;
        }
        


        //traer todas las aplicaciones del usuario, si tiene mas de 1 no lo deja pasar
        let applications = await context.app.service("applications").find({
            query: {
                user: context.params.user._id
            }
        });

        //ver hoy! importante para que solo deje crear una aplicacion!!!!!!!!!!!!
        console.log("applications", applications);

         applications = applications.data;

        if (applications.total > 0) {
            throw new Error("Ya tienes una aplicación");
        }



    };
};
