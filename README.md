# Backend del Portfolio

Este es el backend del proyecto de portfolio personal desarrollado con **Node.js** y **Express**. Proporciona los endpoints necesarios para manejar proyectos, autorización y envío de correos electrónicos.

## Características

- **Express** como framework principal.
- Conexión a una base de datos **MongoDB**.
- Uso de **JWT** para la autenticación.
- Manejo de **correos electrónicos** con Nodemailer.
- Variables de entorno configuradas mediante **dotenv**.

## Requisitos Previos

- Tener instalado [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/).
- Una base de datos MongoDB disponible.
- Credenciales para Google Email API (si se desea utilizar el servicio de correo).

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/NaylaBacic/portfolio-backend.git
   ```

2. Ve al directorio del proyecto:

   ```bash
   cd backend-portfolio
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Renombra el archivo `.env.example` a `.env` y completa los valores requeridos:

   ```env
   # Puerto de la aplicación
   PORT=3000
   # Clave secreta para JWT
   SECRET="my_little_secret"
   # URI de la base de datos
   MONGO_URI="Completar con tu URI de MongoDB"
   # Google email
   GOOGLE_EMAIL="tu_correo_gmail@gmail.com"
   # Google email key: https://myaccount.google.com/apppasswords
   GOOGLE_EMAIL_KEY="Completar con tu key de Google"
   # Tu correo electrónico temporal: https://temp-mail.org/es/
   TEMP_EMAIL="Completar con tu correo temporal"
   ```

5. Inicia la base de datos MongoDB (si es necesario).

## Uso

1. Inicia el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

2. El backend estará disponible en [http://localhost:3000](http://localhost:3000) (o el puerto configurado en las variables de entorno).

## Scripts Disponibles

- `npm start`: Inicia el servidor en modo producción.
- `npm run dev`: Inicia el servidor en modo desarrollo con Nodemon.
- `npm run seed`: Ejecuta el script para poblar la base de datos con datos iniciales.

## Tecnologías Utilizadas

- Node.js
- Express
- Mongoose
- JWT
- Nodemailer
- Dotenv
