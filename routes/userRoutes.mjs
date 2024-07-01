import express from "express";

const route = express.Router();

import {
  usuarios,
  CreateUser,
  login,
  confirmar,
  recoverPassword,
  confirmarTokenRecover,
  newPassword,
} from "../controllers/userController.mjs";

route.get("/", usuarios);
route.post("/", CreateUser);
route.post("/login", login);
route.get("/confirmar/:token", confirmar);
route.post("/recover", recoverPassword);
route.get("/recover/:token", confirmarTokenRecover);
route.post("/recover/:token", newPassword);
// route.get("/perfil", checkAuth, perfil);

export default route;
