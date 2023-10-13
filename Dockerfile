# Use an image with Node.js installed
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app/api

# Copiar los archivos de la API
COPY ./package.json ./
COPY ./ ./
RUN yarn install


# Comando para ejecutar la API
CMD ["node", "./src/index.js"]
