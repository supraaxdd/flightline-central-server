import { Router } from "express";
import { getEventById } from "../services/eventService";

const router = Router();

router.get('/getById/:id', getEventById);

export default router;