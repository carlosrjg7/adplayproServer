import express from "express";

const route = express.Router();

import {
  listPlaylistDetails,
  createPlaylistDetail,
  getPlaylistDetailById,
  updatePlaylistDetail,
  deletePlaylistDetail,
} from "../controllers/playlistDetailsController.mjs";

route.get("/", listPlaylistDetails);
route.post("/", createPlaylistDetail);
route.get("/:id", getPlaylistDetailById);
route.put("/:id", updatePlaylistDetail);
route.delete("/:id", deletePlaylistDetail);

export default route;
