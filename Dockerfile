# Utilizar una imagen base de Node.js
FROM node:23.5.0-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 4321

# Comando para ejecutar la aplicación
CMD ["npm", "run", "preview"]
