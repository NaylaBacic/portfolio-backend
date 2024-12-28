// Importar dependencias necesarias, incluyendo el modelo de usuario y proyecto
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import Project from '../models/project.js';
import User from '../models/user.js';

// Configuramos las variables de entorno (las cargamos desde el archivo .env)
dotenv.config();

// Definimos el ID del usuario (se utiliza para relacionar los proyectos con el usuario)
const USER_ID = '64b50ed2f7481f1e6cabcde1';

// Función para sembrar la base de datos
const seedDatabase = async () => {
  // extraer ObjectId de mongoose
  const ObjectId = mongoose.Types.ObjectId;
  try {
    // Conexión a la base de datos
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Conectado a MongoDB');

    // Eliminar la base de datos completa
    await mongoose.connection.dropDatabase();
    console.log('Database eliminada');

    // Hasheamos la contraseña para no guardarla como texto plano
    const hashedPassword = await bcrypt.hash('password123', 10);
    // Crear usuarios (en este caso solo uno)
    const users = [
      new User({
        _id: new ObjectId(USER_ID),
        username: 'user1',
        password: hashedPassword,
      }),
    ];
    // Insertar usuarios en la base de datos
    await User.insertMany(users);

    console.log('Usuarios insertados');

    // Crear proyectos
    const projects = [
      new Project({
        _id: new ObjectId('61f1b1b1b1b1b1b1b1b1b1b1'),
        title: 'Clon de Instagram',
        description:
          'Construído usando el stack MERN. Incluye un chat en tiempo real que utiliza socket.iO.',
        image: 'https://i.ibb.co/jWG3Z34/Captura-de-pantalla-2024-12-20-190252.png',
        user: users[0]._id,
      }),
      new Project({
        _id: new ObjectId('61f1b1b1b1b1b1b1b1b1b1b2'),
        title: 'CV Generador',
        description:
          'Generador de CVs hecho en ReactJS. Permite generar Cvs totalmente personalizables y en pocos minutos.',
        image: 'https://i.ibb.co/93gWMbS/Captura-de-pantalla-2024-12-20-204800.png',
        user: users[0]._id,
      }),
      new Project({
        _id: new ObjectId('61f1b1b1b1b1b1b1b1b1b1b3'),
        title: 'Crypto Tracker',
        description:
          'Crypto Tracker está constrído en  ReactJS y Chakra UI. Soporta modo oscuro. Utiliza la API de CoinGecko.',
        image: 'https://i.ibb.co/yNgfkbb/Captura-de-pantalla-2024-12-20-205045.png',
        user: users[0]._id,
      }),
      new Project({
        _id: new ObjectId('61f1b1b1b1b1b1b1b1b1b1b4'),
        title: 'Hulu Clon',
        description:
          'Website contruído usando NextJS y tailwindCSS. Utiliza la API de TMDB. Despliegue en Vercel.',
        image: 'https://i.ibb.co/7ndpWRb/Captura-de-pantalla-2024-12-20-205216.png',
        user: users[0]._id,
      }),
      new Project({
        _id: new ObjectId('61f1b1b1b1b1b1b1b1b1b1b5'),
        title: 'WebChat',
        description:
          'Desarrollado en javaScript vanilla y Socket IO. Permite la conexión de múltiples usuarios.',
        image: 'https://i.ibb.co/myQKvFS/Captura-de-pantalla-2024-12-20-205330.png',
        user: users[0]._id,
      }),
      new Project({
        _id: new ObjectId('61f1b1b1b1b1b1b1b1b1b1b6'),
        title: 'Task Manager Pro',
        description:
          'Aplicación web desarrollada con Angular y Firebase para gestionar tareas y proyectos. Incluye autenticación con Google y notificaciones en tiempo real.',
        image: 'https://i.ibb.co/68BR33F/Captura-de-pantalla-2024-12-21-174317.png',
        user: users[0]._id,
      }),
      new Project({
        _id: new ObjectId('61f1b1b1b1b1b1b1b1b1b1b7'),
        title: 'Tienda E-Commerce',
        description:
          'Tienda online creada con Shopify y ReactJS. Incluye un carrito de compras dinámico, pasarela de pagos con Stripe, y gestión de inventario.',
        image: 'https://i.ibb.co/1LP6ScF/Captura-de-pantalla-2024-12-21-174457.png',
        user: users[0]._id,
      }),
      new Project({
        _id: new ObjectId('61f1b1b1b1b1b1b1b1b1b1b8'),
        title: 'Clima App',
        description:
          'Aplicación del clima construida con Vue.js y TailwindCSS. Utiliza la API de OpenWeatherMap para proporcionar datos meteorológicos precisos.',
        image: 'https://i.ibb.co/80r2qCQ/imagen.png',
        user: users[0]._id,
      }),
      new Project({
        _id: new ObjectId('61f1b1b1b1b1b1b1b1b1b1b9'),
        title: 'Buscador de recetas',
        description:
          'Desarrollado con Svelte y Node.js. Permite buscar recetas por ingredientes y proporciona información nutricional mediante la API de Edamam.',
        image: 'https://i.ibb.co/zfwvXb0/imagen.png',
        user: users[0]._id,
      }),
    ];
    // Insertar proyectos en la base
    await Project.insertMany(projects);

    console.log('Proyectos insertados');

    // Cerrar conexión a la base de datos
    await mongoose.disconnect();
    console.log('Base de datos sembrada con éxito');
  } catch (err) {
    console.error('Error sembrando base de datos:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
};

// Ejecutar la función para sembrar la base de datos
seedDatabase();
