import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*
model Subscription {
  id        Int      @id @default(autoincrement())
  user      User     @relation(fields: [idUser], references: [id])
  idUser    Int
  plan      Plan     @relation(fields: [idPlan], references: [id])
  idPlan    Int
  startDate DateTime @default(now())
  endDate   DateTime
  status    Boolean
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
*/

const listSubscriptions = async (req, res) => {
  try {
    const subscriptions = await prisma.subscription.findMany();
    res.json(subscriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch subscriptions from the database",
    });
  }
};

const createSubscription = async (req, res) => {
  try {
    const { idUser, idPlan, startDate, endDate, status } = req.body;
    const newSubscription = await prisma.subscription.create({
      data: {
        idUser,
        idPlan,
        startDate,
        endDate,
        status,
      },
    });
    res.json(newSubscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create subscription in the database",
    });
  }
};

const getSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await prisma.subscription.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (subscription) {
      res.json(subscription);
    } else {
      res.status(404).json({ error: "Subscription not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch subscription from the database",
    });
  }
};

const updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const { idUser, idPlan, startDate, endDate, status } = req.body;
    const subscription = await prisma.subscription.update({
      where: {
        id: parseInt(id),
      },
      data: {
        idUser,
        idPlan,
        startDate,
        endDate,
        status,
      },
    });
    res.json(subscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update subscription in the database",
    });
  }
};

const deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.subscription.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "Subscription deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to delete subscription from the database",
    });
  }
};

export {
  listSubscriptions,
  createSubscription,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
};
