// Importamos mongoose
import mongoose from 'mongoose';

// Definimos el esquema de la colección user
const userSchema = new mongoose.Schema({
  // Definimos los campos del esquema con sus respectivos tipos de datos (nombre de usuario, y contraseña)
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Exportamos el modelo User
export default mongoose.model('User', userSchema);
