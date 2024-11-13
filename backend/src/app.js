import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// import routes
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
export default app;
