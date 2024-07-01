import express from "express";

const route = express.Router();

import {
  listSubscriptions,
  createSubscription,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
} from "../controllers/subscriptionController.mjs";

route.get("/", listSubscriptions);
route.post("/", createSubscription);
route.get("/:id", getSubscriptionById);
route.put("/:id", updateSubscription);
route.delete("/:id", deleteSubscription);

export default route;
