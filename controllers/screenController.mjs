import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const screens = async (req, res) => {
  try {
    const allScreens = await prisma.screen.findMany();
    res.json(allScreens);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to fetch screens from the database" });
  }
};

const createScreen = async (req, res) => {
  try {
    const { user, status } = req.body;
    const newScreen = await prisma.screen.create({
      data: {
        user: {
          connect: {
            id: user,
          },
        },
        status,
      },
    });
    res.json(newScreen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create screen in the database" });
  }
};

const getScreenById = async (req, res) => {
  try {
    const { id } = req.params;
    const screen = await prisma.screen.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (screen) {
      res.json(screen);
    } else {
      res.status(404).json({ error: "Pantalla no encontrada" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch screen from the database" });
  }
};

const updateScreen = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedScreen = await prisma.screen.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status,
      },
    });
    res.json(updatedScreen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update screen in the database" });
  }
};

const deleteScreen = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedScreen = await prisma.screen.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(deletedScreen);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to delete screen from the database" });
  }
};

export { screens, createScreen, getScreenById, updateScreen, deleteScreen };
