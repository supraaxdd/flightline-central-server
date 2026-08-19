import express from "express";
import userRouter from "./routes/UserRouter"
import controllerRouter from "./routes/ControllerRouter";
import eventRouter from "./routes/EventRouter";
import ecaRouter from "./routes/EventControllerAttendeeRouter"
import airportRouter from "./routes/AirportRouter";
import positionRouter from "./routes/ControllerPositionRouter";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/controllers", controllerRouter);
app.use("/api/events", eventRouter);
app.use("/api/eca", ecaRouter);
app.use("/api/airports", airportRouter);
app.use("/api/positions", positionRouter);

app.use(errorHandler);

export default app;