// Importamos la función createTransport de nodemailer
import { createTransport } from 'nodemailer';

export const send = async (req, res) => {
  // Obtenemos los datos del proyecto desde el cuerpo de la petición
  const { name, email, message } = req.body;
  try {
    // Creamos un objeto transporter con los datos del servidor de correo
    const transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        // Datos del correo electrónico desde el que se enviará el correo electrónico (se lee de las variables de entorno del archivo .env)
        user: process.env.GOOGLE_EMAIL,
        // Contraseña del correo electrónico desde el que se enviará el correo electrónico (se lee de las variables de entorno del archivo .env)
        pass: process.env.GOOGLE_EMAIL_KEY,
      },
    });

    // Enviamos el correo electrónico
    transporter.sendMail(
      {
        from: 'no-reply@nayla.com',
        to: process.env.TEMP_EMAIL,
        subject: 'Contacto desde el portfolio',
        text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
      },
      (error, info) => {
        if (error) {
          console.log('Error al enviar el correo:', error);
          return null;
        }

        return info.messageId;
      }
    );
    // Respondemos con el mensaje "Correo enviado"
    res.status(201).json({ message: 'Correo enviado' });
  } catch (err) {
    // Si ocurre un error, respondemos con un mensaje de error
    res.status(400).json({ message: 'Error al crear un proyecto', error: err.message });
  }
};
