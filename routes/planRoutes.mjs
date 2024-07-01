import express from "express";

const route = express.Router();

import {
  listPlans,
  createPlan,
  getPlanById,
  updatePlan,
  deletePlan,
} from "../controllers/planController.mjs";

route.get("/", listPlans);
route.post("/", createPlan);
route.get("/:id", getPlanById);
route.put("/:id", updatePlan);
route.delete("/:id", deletePlan);

export default route;
