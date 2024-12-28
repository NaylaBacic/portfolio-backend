// Importamos express, mongoose, cors, dotenv, userRoutes y projectRoutes
import express from 'express';
import cors from 'cors'; // cors se encarga de permitir que un servidor pueda recibir peticiones de otro servidor
import dotenv from 'dotenv'; // dotenv se encarga de cargar las variables de entorno desde un archivo .env
import mongoose from 'mongoose'; // mongoose es un ODM (Object Document Mapper ó Mapeador de Objetos Documentales) para MongoDB

import routes from './src/routes/index-routes.js'; // rutas de la API

// Configuramos las variables de entorno (las cargamos desde el archivo .env)
dotenv.config();
// Creamos una instancia de express
const app = express();

/* INICO MIDDLEWARES GLOBALES */
// Configuramos express para que pueda recibir y enviar datos en formato JSON
app.use(express.json());
// Configuramos express para que pueda recibir peticiones desde cualquier origen
app.use(cors('*'));
// Configuramos las rutas de la API
app.use('/api/', routes);
/* FIN MIDDLEWARES GLOBALES */

// Conectamos a la base de datos de MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  // Si la conexión es exitosa, mostramos un mensaje en la consola
  .then(() => console.log('Conectado a MongoDB'))
  // Si hay un error, mostramos un mensaje en la consola
  .catch((err) => console.error('Error conectando a MongoDB:', err));

// Iniciamos el servidor en el puerto especificado en las variables de entorno
app.listen(process.env.PORT, () => {
  console.clear();
  console.log(`API corriendo en http://localhost:${process.env.PORT}`);
});
