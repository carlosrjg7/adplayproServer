import express from "express";

const route = express.Router();

import {
  screens,
  createScreen,
  getScreenById,
  updateScreen,
  deleteScreen,
} from "../controllers/screenController.mjs";

route.get("/", screens);
route.post("/", createScreen);
route.get("/:id", getScreenById);
route.put("/:id", updateScreen);
route.delete("/:id", deleteScreen);

export default route;
