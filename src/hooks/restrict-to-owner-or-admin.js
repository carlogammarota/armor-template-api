// src/hooks/checkPermissions.js

const { Forbidden } = require('@feathersjs/errors');

module.exports = function (options = {}) {
  return async (context) => {
    const { app, params } = context;

    
    
    const user = context.params.user; // Asume que el ID del usuario está en params.user._id
    // const user = await app.service('users').get(userId); // Obtén el usuario desde el servicio de usuarios
    const id_editar = context.arguments[0];

    if (user.permissions && user.permissions.includes('edit-users') && user.permissions.includes('delete-users')) {
      console.log('Tiene permisos para editar y eliminar y es el dueño del usuario')
      return context; // El usuario tiene permisos para editar y eliminar
    } else {
      if (user._id == id_editar) {
        return context; // El usuario tiene permisos para editar y eliminar
      } else {

        throw new Forbidden('No es el dueño del usuario y no tiene los permisos necesarios para realizar esta acción');
      }
    }

  







    return context 

    // Verifica los permisos del usuario
    // console.log(userId.permissions)
    if (user.permissions.includes('edit-users') && user.permissions.includes('delete-users')) {
      return context; // El usuario tiene permisos para editar y eliminar
    } else {
      throw new Forbidden('No tienes los permisos necesarios para realizar esta acción');
    }

    // const userId = params.user._id; // Asume que el ID del usuario está en params.user._id
    // const user = await app.service('users').get(userId); // Obtén el usuario desde el servicio de usuarios

    // Verifica los permisos del usuario
    if (userId.permissions && user.permissions.includes('edit') && user.permissions.includes('delete')) {
      return context; // El usuario tiene permisos para editar y eliminar
    } else {
      throw new Forbidden('No tienes los permisos necesarios para realizar esta acción');
    }
  };
};
