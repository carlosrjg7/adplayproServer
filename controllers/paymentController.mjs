import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const listPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany();
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch payments from the database",
    });
  }
};

const createPayment = async (req, res) => {
  try {
    const { idUser, idPlan, amount, startDate, endDate, paymentDate, status } =
      req.body;
    const newPayment = await prisma.payment.create({
      data: {
        idUser,
        idPlan,
        amount,
        startDate,
        endDate,
        paymentDate,
        status,
      },
    });
    res.json(newPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create payment in the database",
    });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await prisma.payment.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (payment) {
      res.json(payment);
    } else {
      res.status(404).json({ error: "Payment not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch payment from the database",
    });
  }
};

const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { idUser, idPlan, amount, startDate, endDate, paymentDate, status } =
      req.body;
    const payment = await prisma.payment.update({
      where: {
        id: parseInt(id),
      },
      data: {
        idUser,
        idPlan,
        amount,
        startDate,
        endDate,
        paymentDate,
        status,
      },
    });
    res.json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update payment in the database",
    });
  }
};

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.payment.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to delete payment from the database",
    });
  }
};

export {
  listPayments,
  createPayment,
  getPaymentById,
  updatePayment,
  deletePayment,
};
