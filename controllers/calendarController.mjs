import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const listCalendars = async (req, res) => {
  try {
    const calendars = await prisma.calendar.findMany();
    res.json(calendars);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch calendars from the database",
    });
  }
};

const createCalendar = async (req, res) => {
  try {
    const { idResource, idPlaylist, start, end, repeat, status } = req.body;
    const newCalendar = await prisma.calendar.create({
      data: {
        idResource,
        idPlaylist,
        start,
        end,
        repeat,
        status,
      },
    });
    res.json(newCalendar);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create calendar in the database",
    });
  }
};

const getCalendarById = async (req, res) => {
  try {
    const { id } = req.params;
    const calendar = await prisma.calendar.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (calendar) {
      res.json(calendar);
    } else {
      res.status(404).json({ error: "Calendar not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch calendar from the database",
    });
  }
};

const updateCalendar = async (req, res) => {
  try {
    const { id } = req.params;
    const { idResource, idPlaylist, start, end, repeat, status } = req.body;
    const calendar = await prisma.calendar.update({
      where: {
        id: parseInt(id),
      },
      data: {
        idResource,
        idPlaylist,
        start,
        end,
        repeat,
        status,
      },
    });
    res.json(calendar);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update calendar in the database",
    });
  }
};

const deleteCalendar = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.calendar.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "Calendar deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to delete calendar from the database",
    });
  }
};

export {
  listCalendars,
  createCalendar,
  getCalendarById,
  updateCalendar,
  deleteCalendar,
};
