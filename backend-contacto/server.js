const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db } = require('./FirebaseConfig');
const { collection, addDoc } = require('firebase/firestore');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Ruta para manejar la recepción de datos del formulario de contacto
app.post('/contacto', async (req, res) => {
  const { nombre, correo, confirmarCorreo, telefono, mensaje } = req.body;

  if (!nombre || !correo || !confirmarCorreo || !telefono || !mensaje) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    // Guarda los datos en Firestore
    await addDoc(collection(db, 'contactos'), {
      nombre,
      correo,
      telefono,
      mensaje,
      timestamp: new Date()
    });
    res.status(200).json({ message: 'Mensaje enviado correctamente.' });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).json({ message: 'Error al enviar el mensaje.', error });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});