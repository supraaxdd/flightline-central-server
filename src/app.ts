import express from "express";
import userRouter from "./routes/userRouter"

const app = express();

app.use(express.json());

// Routes
app.use("/api/users", userRouter);

export default app;