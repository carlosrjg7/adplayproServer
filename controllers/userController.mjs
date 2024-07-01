import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";
import generarId from "./../helpers/generarId.mjs";
import { emailRegistro, emailOlvidePassword } from "./../helpers/email.mjs";
import generarJWT from "./../helpers/generarJWT.mjs";

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model === "Usuario" && params.action === "create") {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(params.args.data.password, salt);
    params.args.data.password = hashedPassword;
  }

  const result = await next(params);

  return result;
});

const usuarios = async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      lastname: true,
      email: true,
      status: true,
      role: true,
      confirmed: true,
      createdAt: true,
    },
  });
  res.json(users);
};

const CreateUser = async (req, res) => {
  const { email } = req.body;
  const existeUsuario = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (existeUsuario) {
    const error = new Error(
      "Ya existe un usuario registrado con el mismo email."
    );

    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = req.body;
    user.token = generarId();
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const usuario = await prisma.user.create({
      data: {
        ...user,
      },
    });

    emailRegistro({
      email: usuario.email,
      name: usuario.name,
      token: usuario.token,
    });

    res.json({ msg: "Usuario Creado correctamente." });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log(`Ya existe un usuario registrado con este email.`);
      }
    }
    throw error;
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!usuario) {
    const error = new Error("El Usuario no existe");
    return res.status(400).json({ msg: error.message });
  }

  //user confirmed
  if (!usuario.confirmed) {
    const error = new Error("Tu Cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  //user password compare
  const validPassword = await bcrypt.compare(password, usuario.password);

  if (validPassword) {
    res.json({
      id: usuario.id,
      name: usuario.name,
      lastname: usuario.lastname,
      email: usuario.email,
      token: generarJWT(usuario.id),
    });
  } else {
    const error = new Error("Contraseña incorrecta");
    return res.status(403).json({ msg: error.message });
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params;

  const usuarioConfirmar = await prisma.user.findFirst({
    where: {
      token,
    },
  });

  if (!usuarioConfirmar) {
    const error = new Error("Token no valido");
    return res.status(403).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.token = "";
    usuarioConfirmar.confirmed = true;

    await prisma.user.update({
      where: {
        id: usuarioConfirmar.id,
      },
      data: {
        token: usuarioConfirmar.token,
        confirmed: usuarioConfirmar.confirmed,
      },
    });

    res.json({ msg: "Usuario confirmado exitosamente" });
  } catch (error) {
    console.log(error);
  }
};

const recoverPassword = async (req, res) => {
  const { email } = req.body;

  // user exist
  const usuario = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!usuario) {
    const error = new Error("El Usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuario.token = generarId();
    await prisma.user.update({
      where: {
        id: usuario.id,
      },
      data: {
        token: usuario.token,
        confirmed: false,
      },
    });

    emailOlvidePassword({
      email: usuario.email,
      name: usuario.name,
      token: usuario.token,
    });

    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

const confirmarTokenRecover = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await prisma.user.findFirst({
    where: {
      token,
    },
  });

  if (tokenValido) {
    // valido
    res.json({ msg: "Token valido y usuario existe" });
  } else {
    const error = new Error("Token no valido.");
    return res.status(402).json({ msg: error.message });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuario = await prisma.user.findFirst({
    where: {
      token,
    },
  });

  if (usuario) {
    // valido
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    usuario.password = hashedPassword;
    usuario.token = "";

    try {
      await prisma.user.update({
        where: {
          id: usuario.id,
        },
        data: {
          password: usuario.password,
          token: usuario.token,
          confirmed: true,
        },
      });

      res.json({ msg: "Contraseña Actualizada con exito!" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token no valido.");
    return res.status(404).json({ msg: error.message });
  }
};

export {
  usuarios,
  CreateUser,
  login,
  confirmar,
  recoverPassword,
  confirmarTokenRecover,
  newPassword,
};
