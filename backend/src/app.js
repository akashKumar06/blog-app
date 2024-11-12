import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

// import routes
import userRoutes from "./routes/user.routes.js";

app.use("/api/v1/users", userRoutes);
export default app;
