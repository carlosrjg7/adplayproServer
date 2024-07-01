import { PrismaClient } from "@prisma/client";
import { usuarios } from "./data/Usuario.mjs";

const prisma = new PrismaClient();

const main = async () => {
  try {
    await prisma.user.createMany({
      data: usuarios,
    });
  } catch (error) {
    console.log(error);
  }
};

main();
