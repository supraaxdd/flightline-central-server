import express from "express";
import userRouter from "./routes/userRouter"
import controllerRouter from "./routes/controllerRouter";
import eventRouter from "./routes/eventRouter";

const app = express();

app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/controllers", controllerRouter);
app.use("/api/events", eventRouter);

export default app;