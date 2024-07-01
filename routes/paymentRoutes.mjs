import express from "express";

const route = express.Router();

import {
  listPayments,
  createPayment,
  getPaymentById,
  updatePayment,
  deletePayment,
} from "../controllers/paymentController.mjs";

route.get("/", listPayments);
route.post("/", createPayment);
route.get("/:id", getPaymentById);
route.put("/:id", updatePayment);
route.delete("/:id", deletePayment);

export default route;
