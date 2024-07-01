import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const listPlaylistDetails = async (req, res) => {
  try {
    const playlistDetails = await prisma.playlistDetail.findMany();
    res.json(playlistDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch playlistDetails from the database",
    });
  }
};

const createPlaylistDetail = async (req, res) => {
  try {
    const { idPlaylist, idResource, time, orden, status } = req.body;
    const newPlaylistDetail = await prisma.playlistDetail.create({
      data: {
        idPlaylist,
        idResource,
        time,
        orden,
        status,
      },
    });
    res.json(newPlaylistDetail);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create playlistDetail in the database",
    });
  }
};

const getPlaylistDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const playlistDetail = await prisma.playlistDetail.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (playlistDetail) {
      res.json(playlistDetail);
    } else {
      res.status(404).json({ error: "PlaylistDetail not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch playlistDetail from the database",
    });
  }
};

const updatePlaylistDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { idPlaylist, idResource, time, orden, status } = req.body;
    const updatedPlaylistDetail = await prisma.playlistDetail.update({
      where: {
        id: parseInt(id),
      },
      data: {
        idPlaylist,
        idResource,
        time,
        orden,
        status,
      },
    });
    res.json(updatedPlaylistDetail);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update playlistDetail in the database",
    });
  }
};

const deletePlaylistDetail = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.playlistDetail.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "PlaylistDetail deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to delete playlistDetail from the database",
    });
  }
};

export {
  listPlaylistDetails,
  createPlaylistDetail,
  getPlaylistDetailById,
  updatePlaylistDetail,
  deletePlaylistDetail,
};
