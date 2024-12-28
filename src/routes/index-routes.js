// Importamos express y los controladores de proyecto
import express from 'express';

import { authenticate } from '../middlewares/authenticate.js';
import { create, getAll, update, remove } from '../controllers/project-controller.js';
import { login, register } from '../controllers/user-controller.js';
import { send } from '../controllers/email-controller.js';

// Creamos un router de express
const router = express.Router();

/* Configuramos las rutas de la API */
// Rutas de usuario (registro y login)
router.post('/users/register', register);
router.post('/users/login', login);

// Rutas de proyecto (crear, obtener todos, actualizar y eliminar)
router.post('/projects/', authenticate, create);
router.get('/projects/', getAll);
router.put('/projects/:id', authenticate, update);
router.delete('/projects/:id', authenticate, remove);

// Ruta de envío de correo electrónico
router.post('/emails', send);

// Exportamos el router
export default router;
