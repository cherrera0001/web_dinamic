const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pruebabackend123@gmail.com',
    pass: 'ltul wdis kjju noef',
  },
});

const mailOptions = {
  from: 'pruebabackend123@gmail.com',
  to: 'walterxd69@gmail.com',
  subject: 'Prueba de envío de correo',
  text: 'Este es un mensaje de prueba.',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error('Error al enviar el correo:', error);
  }
  console.log('Correo enviado:', info.response);
});