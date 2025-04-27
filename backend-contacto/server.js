const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { db } = require('./FirebaseConfig');
const { collection, addDoc } = require('firebase/firestore');

const app = express();
const PORT = 3000;

// Clave secreta de reCAPTCHA
const RECAPTCHA_SECRET_KEY = '6LdirpYqAAAAAPLdQQ6AaR2lHSZTDgXdiV-WS6j8';

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Ruta para manejar la recepción de datos del formulario de contacto
app.post('/contacto', async (req, res) => {
  const { nombre, correo, confirmarCorreo, telefono, mensaje } = req.body;

  if (!nombre || !correo || !confirmarCorreo || !telefono || !mensaje) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }
  
  if (correo !== confirmarCorreo) {
    return res.status(400).json({ message: 'Los correos electrónicos no coinciden.' });
  }

 // Validar reCAPTCHA
 try {
  const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
    params: {
      secret: RECAPTCHA_SECRET_KEY,
      response: recaptchaToken,
    },
  });

  const { success, score } = response.data;

  if (!success || score < 0.5) {
    return res.status(400).json({ message: 'Verificación de reCAPTCHA fallida.' });
  }
} catch (error) {
  console.error('Error al verificar reCAPTCHA:', error);
  return res.status(500).json({ message: 'Error al verificar reCAPTCHA.' });
}

// Guardar datos en Firestore si el reCAPTCHA es válido
try {
  await addDoc(collection(db, 'contactos'), {
    nombre,
    correo,
    telefono,
    mensaje,
    timestamp: new Date(),
  });

  res.status(200).json({ message: 'Mensaje enviado correctamente.' });
} catch (error) {
  console.error('Error al guardar los datos:', error);
  res.status(500).json({ message: 'Error al enviar el mensaje.', error });
}
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${3000}`);
});