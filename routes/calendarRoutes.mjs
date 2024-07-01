import express from "express";

const route = express.Router();

import {
  listCalendars,
  createCalendar,
  getCalendarById,
  updateCalendar,
  deleteCalendar,
} from "../controllers/calendarController.mjs";

route.get("/", listCalendars);
route.post("/", createCalendar);
route.get("/:id", getCalendarById);
route.put("/:id", updateCalendar);
route.delete("/:id", deleteCalendar);

export default route;
