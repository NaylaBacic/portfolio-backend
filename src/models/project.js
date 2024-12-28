// Importamos mongoose
import mongoose from 'mongoose';

// Definimos el esquema de la colección project
const projectSchema = new mongoose.Schema({
  // Definimos los campos del esquema con sus respectivos tipos de datos (título, descripción, imagen y usuario, donde usuario es una referencia al modelo User)
  title: { type: String, required: true },
  description: String,
  image: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

// Exportamos el modelo Project
export default mongoose.model('Project', projectSchema);
