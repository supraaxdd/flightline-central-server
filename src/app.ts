import express from "express";
import userRouter from "./routes/UserRouter"
import controllerRouter from "./routes/ControllerRouter";
import eventRouter from "./routes/EventRouter";

const app = express();

app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/controllers", controllerRouter);
app.use("/api/events", eventRouter);

export default app;