import express from "express";

const route = express.Router();

import {
  listResources,
  createResource,
  getResourceById,
  updateResource,
  deleteResource,
  getResourceByUser,
} from "../controllers/resourceController.mjs";

route.get("/", listResources);
route.post("/", createResource);
route.get("/:id", getResourceById);
route.put("/:id", updateResource);
route.delete("/:id", deleteResource);
route.get("/user/:idUser", getResourceByUser);

export default route;
