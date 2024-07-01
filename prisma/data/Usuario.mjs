import { Rol } from "@prisma/client";

const usuarios = {
  name: "Carlos",
  lastname: "Garcia",
  email: "carlosrjg7@gmail.com",
  password: "1234",
  status: true,
  role: Rol.ADMIN,
  token: "",
};

export { usuarios };
