import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.mjs";
import screenRoutes from "./routes/screenRoutes.mjs";
import resourceRoutes from "./routes/resourceRoutes.mjs";
import playlistRoutes from "./routes/playlistRoutes.mjs";
import playlistDetailRoutes from "./routes/playlistDetailsRoutes.mjs";
import calendarRoutes from "./routes/calendarRoutes.mjs";
import planRoutes from "./routes/planRoutes.mjs";
import subscriptionRoutes from "./routes/subscriptionRoutes.mjs";
import paymentRoutes from "./routes/paymentRoutes.mjs";

const app = express();

app.use(express.json());

const whitelist = [
  process.env.FRONTEND_URL,
  "http://localhost:3000/",
  "http://localhost:3001",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error de cors"));
    }
  },
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("HOLA MUNDO API");
});

app.use("/api/user", userRoutes);
app.use("/api/screen", screenRoutes);
app.use("/api/resource", resourceRoutes);
app.use("/api/playlist", playlistRoutes);
app.use("/api/playlistDetail", playlistDetailRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/plan", planRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("payment", paymentRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
