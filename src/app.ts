import express from "express";
import academyRoutes from "./routes/academyRouter"


const app = express();

app.use(express.json());

// Routes
app.use("/api/academy", academyRoutes);

export default app;