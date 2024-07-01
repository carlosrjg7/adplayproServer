import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const listPlaylists = async (req, res) => {
  try {
    const playlists = await prisma.playlist.findMany();
    res.json(playlists);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch playlists from the database",
    });
  }
};

const createPlaylist = async (req, res) => {
  try {
    const { name, user, status, PlaylistDetail = [], Calendar = [] } = req.body;
    const newPlaylist = await prisma.playlist.create({
      data: {
        user,
        name,
        status,
        PlaylistDetail,
        Calendar,
      },
    });

    res.json(newPlaylist);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create playlist in the database",
    });
  }
};

const getPlaylistById = async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await prisma.playlist.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (playlist) {
      res.json(playlist);
    } else {
      res.status(404).json({ error: "Playlist not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch playlist from the database",
    });
  }
};

const updatePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, user, status, PlaylistDetail, Calendar } = req.body;
    const updatedPlaylist = await prisma.playlist.update({
      where: {
        id: parseInt(id),
      },
      data: {
        user,
        name,
        status,
        PlaylistDetail,
        Calendar,
      },
    });
    res.json(updatedPlaylist);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update playlist in the database",
    });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.playlist.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "Playlist deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to delete playlist from the database",
    });
  }
};

export {
  listPlaylists,
  createPlaylist,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
};
