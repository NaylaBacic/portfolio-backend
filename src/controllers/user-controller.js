// importamos los paquetes necesarios y el modelo de usuario
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
export const register = async (req, res) => {
  // Obtenemos los datos del usuario desde el cuerpo de la petición
  const { username, password } = req.body;
  try {
    // Hasheamos la contraseña del usuario con bcrypt para almacenarla de forma segura
    const hashedPassword = await bcrypt.hash(password, 10);
    // Creamos una nueva instancia del modelo User con los datos del usuario
    const user = new User({ username, password: hashedPassword });
    // Guardamos el usuario en la base de datos
    await user.save();
    res.status(201).json({ message: 'Usuario creado', user });
  } catch (err) {
    // Si ocurre un error, respondemos con un mensaje de error
    res.status(400).json({ message: 'Error al crear un usuario', error: err.message });
  }
};

export const login = async (req, res) => {
  // Obtenemos los datos del usuario desde el cuerpo de la petición
  const { username, password } = req.body;
  try {
    // Buscamos el usuario en la base de datos
    const user = await User.findOne({ username });

    // Si el usuario no existe, lanzamos un error
    if (!user) throw new Error('Usuario no encontrado');
    // Comparamos la contraseña ingresada con la almacenada en la base de datos
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // Si la contraseña no es válida, lanzamos un error
    if (!isPasswordValid) throw new Error('Credenciales inválidas');

    // Generamos un token de sesión con JWT
    const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '10d' });
    // Respondemos con el token de sesión
    res.json({ token });
  } catch (err) {
    // Si ocurre un error, respondemos con un mensaje de error
    res.status(401).json({ message: err.message });
  }
};
