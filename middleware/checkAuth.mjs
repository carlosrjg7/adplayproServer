import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        console.log(error);
        debugger;
      }

      req.usuario = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
        select: {
          id: true,
          name: true,
          lastname: true,
          email: true,
        },
      });

      return next();
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: "Hubo un error o su token expiro." });
    }
  }

  if (!token) {
    const error = new Error("Token no valido.");
    return res.status(404).json({ msg: error.message });
  }

  next();
};

export default checkAuth;
