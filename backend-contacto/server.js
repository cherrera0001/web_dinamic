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
    .catch((error) => res.status(500).json({ message: 'Error al enviar el mensaje.', error }));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Configuración para enviar correos con nodemailer
function enviarCorreo({ nombre, rut, telefono, correo, mensaje }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Usa tu servicio de correo (Gmail, Outlook, etc.)
    auth: {
      user: 'tu_correo@gmail.com', // Cambia esto por tu correo
      pass: 'tu_contraseña', // Cambia esto por tu contraseña
    },
  });

  const mailOptions = {
    from: 'tu_correo@gmail.com',
    to: 'destinatario_correo@gmail.com', // Cambia esto por el correo donde recibes los mensajes
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

const nodemailer = require('nodemailer');

app.post('/api/contact', async (req, res) => {
    const { nombre, rut, telefono, correo, mensaje } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tu_email@gmail.com',
            pass: 'tu_password'
        }
    });

    const mailOptions = {
        from: 'tu_email@gmail.com',
        to: 'destinatario@gmail.com',
        subject: 'Nuevo mensaje de contacto',
        text: `Nombre: ${nombre}\nRUT: ${rut}\nTeléfono: ${telefono}\nCorreo: ${correo}\nMensaje: ${mensaje}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Formulario enviado y correo enviado con éxito' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ message: 'Error al enviar el correo' });
    }
});
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/c4a', { useNewUrlParser: true, useUnifiedTopology: true });

const ContactSchema = new mongoose.Schema({
  nombre: String,
  rut: String,
  telefono: String,
  correo: String,
  mensaje: String,
});

const Contact = mongoose.model('Contact', ContactSchema);

app.post('/contacto', async (req, res) => {
  try {
    const contacto = new Contact(req.body);
    await contacto.save();
    res.status(200).json({ message: 'Mensaje guardado y enviado correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar el mensaje.', error });
  }
});