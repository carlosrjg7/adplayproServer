import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const listResources = async (req, res) => {
  try {
    const resources = await prisma.resource.findMany();
    res.json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch resources from the database",
    });
  }
};

const createResource = async (req, res) => {
  try {
    const { idUser, name, size, type, url, ruta, PlaylistDetail, Calendar } =
      req.body;
    const newResource = await prisma.resource.create({
      data: {
        idUser,
        name,
        size,
        type,
        url,
        ruta,
        PlaylistDetail,
        Calendar,
      },
    });
    res.json(newResource);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create resource in the database",
    });
  }
};

const getResourceById = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await prisma.resource.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (resource) {
      res.json(resource);
    } else {
      res.status(404).json({ error: "Resource not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch resource from the database",
    });
  }
};

const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { idUser, name, size, type, url, ruta, PlaylistDetail, Calendar } =
      req.body;
    const updatedResource = await prisma.resource.update({
      where: {
        id: parseInt(id),
      },
      data: {
        idUser,
        name,
        size,
        type,
        url,
        ruta,
        PlaylistDetail,
        Calendar,
      },
    });
    res.json(updatedResource);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update resource in the database",
    });
  }
};

const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedResource = await prisma.resource.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(deletedResource);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to delete resource from the database",
    });
  }
};

const getResourceByUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const resources = await prisma.resource.findMany({
      where: {
        idUser: parseInt(idUser),
      },
    });
    res.json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch resources from the database",
    });
  }
};

export {
  listResources,
  createResource,
  getResourceById,
  updateResource,
  deleteResource,
  getResourceByUser,
};
