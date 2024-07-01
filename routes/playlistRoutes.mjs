import express from "express";

const route = express.Router();

import {
  listPlaylists,
  createPlaylist,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
} from "../controllers/playlistController.mjs";

route.get("/", listPlaylists);
route.post("/", createPlaylist);
route.get("/:id", getPlaylistById);
route.put("/:id", updatePlaylist);
route.delete("/:id", deletePlaylist);

export default route;
