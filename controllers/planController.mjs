import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*
model Plan {
  id           Int            @id @default(autoincrement())
  amount       Float
  name         String
  details      String
  status       Boolean
  screens      Int
  Subscription Subscription[]
  Payment      Payment[]
}
*/

const listPlans = async (req, res) => {
  try {
    const plans = await prisma.plan.findMany();
    res.json(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch plans from the database",
    });
  }
};

const createPlan = async (req, res) => {
  try {
    const { amount, name, details, status, screens } = req.body;
    const newPlan = await prisma.plan.create({
      data: {
        amount,
        name,
        details,
        status,
        screens,
      },
    });
    res.json(newPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create plan in the database",
    });
  }
};

const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await prisma.plan.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (plan) {
      res.json(plan);
    } else {
      res.status(404).json({ error: "Plan not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch plan from the database",
    });
  }
};

const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, name, details, status, screens } = req.body;
    const plan = await prisma.plan.update({
      where: {
        id: parseInt(id),
      },
      data: {
        amount,
        name,
        details,
        status,
        screens,
      },
    });
    res.json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update plan in the database",
    });
  }
};

const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.plan.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "Plan deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to delete plan from the database",
    });
  }
};

export { listPlans, createPlan, getPlanById, updatePlan, deletePlan };
