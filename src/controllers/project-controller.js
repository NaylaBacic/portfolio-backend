// Importamos el modelo Project
import Project from '../models/project.js';

// Creación de un nuevo proyecto
export const create = async (req, res) => {
  // Obtenemos los datos del proyecto desde el cuerpo de la petición
  const { title, description, image } = req.body;
  try {
    // Creamos una nueva instancia del modelo Project
    const project = new Project({ title, description, image, user: req.userId });
    // Guardamos el proyecto en la base de datos
    await project.save();
    // Respondemos con el proyecto creado
    res.status(201).json(project);
  } catch (err) {
    // Si ocurre un error, respondemos con un mensaje de error
    res.status(400).json({ message: 'Error al crear un proyecto', error: err.message });
  }
};

export const getAll = async (req, res) => {
  try {
    // Obtenemos y retornamos todos los proyectos de la base de datos y los populamos con el campo user
    const proyects = await Project.find().populate('user', 'username');
    // Respondemos con los proyectos obtenidos
    res.json(proyects);
  } catch (err) {
    // Si ocurre un error, respondemos con un mensaje de error
    res.status(500).json({ message: 'Error recuperando proyectos', error: err.message });
  }
};

export const update = async (req, res) => {
  // Obtenemos el id del proyecto desde los parámetros de la petición
  const { id } = req.params;
  // Obtenemos los datos del proyecto desde el cuerpo de la petición
  const { title, description, image } = req.body;
  try {
    // Buscamos y actualizamos el proyecto en la base de datos
    const project = await Project.findOneAndUpdate(
      { _id: id, user: req.userId },
      { title, description, image },
      { new: true }
    );

    // Si el proyecto no existe, lanzamos un error
    if (!project) throw new Error('Proyecto no encontrado');

    res.json(project);
  } catch (err) {
    // Si ocurre un error, respondemos con un mensaje de error
    res.status(400).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  // Obtenemos el id del proyecto desde los parámetros de la petición
  const { id } = req.params;
  try {
    // Buscamos y eliminamos el proyecto de la base de datos
    const project = await Project.findOneAndDelete({ _id: id, user: req.userId });
    // Si el proyecto no existe, lanzamos un error
    if (!project) throw new Error('Proyecto no encontrado');

    // Respondemos con un mensaje de
    res.json({ message: 'Proyecto eliminado' });
  } catch (err) {
    // Si ocurre un error, respondemos con un mensaje de error
    res.status(400).json({ message: err.message });
  }
};
