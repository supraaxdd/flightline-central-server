import express from "express";
import userRouter from "./routes/userRouter"
import controllerRouter from "./routes/controllerRouter";

const app = express();

app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/controllers", controllerRouter);

export default app;