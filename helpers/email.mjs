import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  console.log(datos);

  const { email, name, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_EMAIL_HOST,
    port: +process.env.SMTP_EMAIL_PORT,
    auth: {
      user: process.env.SMTP_EMAIL_USER,
      pass: process.env.SMTP_EMAIL_PASS,
    },
  });

  // infor del email

  const info = await transport.sendMail({
    from: '"AdPlayPro - Admin" <admin@adplaypro.com>',
    to: email,
    subject: "AdPlayPro - Confirma tu cuenta",
    text: "Confirma tu cuenta en AdPlayPro",
    html: `
      <p>Hola: ${name}  confirma tu cuenta en AdPlayPro</p>
      <p>Tu cuenta ya esta casi lista, solo debes confirmarla accediendo al siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/login/confirmar-cuenta/${token}">Confirmar Cuenta</a>

      <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje.</p>
    `,
  });
};

export const emailOlvidePassword = async (datos) => {
  console.log(datos);

  const { email, name, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // infor del email

  const info = await transport.sendMail({
    from: '"Pasarela Pagos - Admin" <admin@pasarela.com>',
    to: email,
    subject: "Pasarela - Restablecer password",
    text: "Restablece tu password en Pasarela de Pagos",
    html: `
      <p>Hola: ${name}  has solicitado restablecer tu password</p>
      <p>sigue el siguiente enlace para generar uno nuevo:</p>
      <a href="${process.env.FRONTEND_URL}/login/olvide-password/${token}">Restablecer Password</a>

      <p>Si tu no solicitaste esto, puedes ignorar este mensaje.</p>
    `,
  });
};
