// Importamos la librería jsonwebtoken
import jwt from 'jsonwebtoken';

// Middleware para verificar si el usuario está autenticado
export const authenticate = (req, res, next) => {
  // Obtenemos el token desde el encabezado de la petición
  const token = req.headers.authorization?.split(' ')[1];

  // Si no hay token, respondemos con un mensaje de error
  if (!token) return res.status(401).json({ message: 'Necesitas enviar un token' });

  // Verificamos el token
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    // Si hay un error, respondemos con un mensaje de error
    if (err) return res.status(401).json({ message: 'Token inválido' });
    // Si el token es válido, guardamos el id del usuario en req.userId
    req.userId = decoded.id;
    // Continuar con la ejecución del código
    next();
  });
};
