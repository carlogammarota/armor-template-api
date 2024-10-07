
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
    return async context => {
        try {
            if (!context.params.user) {
                throw new Error("No estás autenticado");
            }

            // Si el usuario tiene permisos de admin, dejarlo pasar
            if (context.params.user.permissions.includes("admin")) {
                console.log("Tiene permisos de admin");
                return context;
            }

            // Obtener el producto
            const products = await context.app.service("products").get(context.id);
            console.log("products", products);

            // Verificar si el producto tiene un usuario asociado
            if (!products || !products.user || !products.user._id) {
                throw new Error("El producto no tiene un usuario asignado o no existe");
            }

            let usuarioCreador = products.user._id;
            let usuarioLogueado = context.params.user._id;

            // Convertir a string
            usuarioCreador = usuarioCreador.toString();
            usuarioLogueado = usuarioLogueado.toString();



            // Verificar si el usuario logueado es el creador del producto
            if (usuarioCreador !== usuarioLogueado) {
                throw new Error("No eres el usuario creador de este producto");
            }

            // Si todo está bien, devolver el contexto
            return context;

        } catch (error) {
            console.error("Error en la validación de usuario:", error.message);

            // Lanzar error con mensaje personalizado
            throw new Error(`Error: ${error.message}`);
        }
    };
};

