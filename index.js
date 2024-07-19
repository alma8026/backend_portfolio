const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el body de las peticiones
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de CORS para permitir solicitudes desde localhost:4200
app.use(cors({
    origin: 'https://alma8026.github.io',
    methods: ['POST'], // Métodos permitidos
    allowedHeaders: ['Content-Type'], // Encabezados permitidos
  }));

// Configuración de nodemailer para enviar correos
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Puedes usar otros servicios como 'SendGrid', 'Outlook', etc.
  auth: {
    user: 'alikswtf@gmail.com', // Tu correo electrónico desde donde enviarás los correos
    pass: 'slmc qmhf roiz anbh' // La contraseña de tu correo electrónico
  }
});

// Ruta para recibir datos del formulario de contacto y enviar correo
app.post('/enviar-correo', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'alikswtf@gmail.com', // Receptor del correo (tu dirección personal)
    subject: subject,
    text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
  };

  // Envío del correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al enviar el correo' }); // Envía respuesta JSON
    } else {
      console.log('Correo enviado con éxito', info.response);
      res.status(200).json({ message: 'Correo enviado con éxito' }); // Envía respuesta JSON
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
