
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
    return async context => {
        if (!context.params.user) {
            throw new Error("No estas autenticado");
        }

        const user = await context.app.service("users").get(context.id);
        console.log("user", user);

        let usuarioCreador = user._id;
        let usuarioLogueado = context.params.user._id;

        //convertir a string
        usuarioCreador = usuarioCreador.toString();
        usuarioLogueado = usuarioLogueado.toString();

        console.log("usuarioCreador", usuarioCreador);
        console.log("usuarioLogueado", usuarioLogueado);


        //si el usuario tiene el permiso de admin lo deja pasar
        if (context.params.user.permissions.includes("admin")) {
            console.log("tiene permisos de admin");
            return context;
        }

        if (usuarioCreador !== usuarioLogueado) {
            throw new Error("No eres el dueño del usuario");
        }
    };
};
