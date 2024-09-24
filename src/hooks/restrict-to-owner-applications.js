
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
    return async context => {
        if (!context.params.user) {
            throw new Error("No estas autenticado");
        }

        const blogs = await context.app.service("blogs").get(context.id);
        console.log("blogs", blogs);

        let usuarioCreador = blogs.user._id;
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
