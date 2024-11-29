const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Ruta para manejar la recepción de datos del formulario de contacto
app.post('/contacto', (req, res) => {
  const { nombre, rut, telefono, correo, mensaje } = req.body;

  if (!nombre || !rut || !telefono || !correo || !mensaje) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  // Aquí puedes guardar los datos en una base de datos o enviar un correo
  enviarCorreo({ nombre, rut, telefono, correo, mensaje })
    .then(() => res.status(200).json({ message: 'Mensaje enviado correctamente.' }))
    .catch((error) => {
      console.error('Error al enviar el mensaje:', error);
      res.status(500).json({ message: 'Error al enviar el mensaje.', error });
    });
});

// Configuración para enviar correos con nodemailer
function enviarCorreo({ nombre, rut, telefono, correo, mensaje }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Usa tu servicio de correo (Gmail, Outlook, etc.)
    auth: {
      user: 'pruebabackend123@gmail.com', // Cambia esto por tu correo
      pass: 'ltul wdis kjju noef', // Cambia esto por tu contraseña
    },
  });

  const mailOptions = {
    from: 'pruebabackend123@gmail.com',
    to: 'walterxd69@gmail.com', // Cambia esto por el correo donde recibes los mensajes
    subject: 'Nuevo Mensaje de Contacto',
    text: `
      Nombre: ${nombre}
      Rut: ${rut}
      Teléfono: ${telefono}
      Correo: ${correo}
      Mensaje: ${mensaje}
    `,
  };

  return transporter.sendMail(mailOptions);
}

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});