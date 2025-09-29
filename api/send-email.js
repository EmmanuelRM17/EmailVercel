const nodemailer = require('nodemailer');

// ADVERTENCIA: Esto es inseguro, solo para pruebas
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: "sistema@odontologiacarol.com",
    pass: "sP8+?;Vs:"
  }
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { to, subject, html } = req.body;

  try {
    await transporter.sendMail({
      from: '"Odontología Carol" <sistema@odontologiacarol.com>',
      to,
      subject,
      html
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}; 