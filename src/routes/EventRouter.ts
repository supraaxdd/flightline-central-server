import { Router } from "express";
import { getEventById, getEventsHostedByUserById } from "../services/EventService";

const router = Router();

router.get('/:id', getEventById);
router.get('/getEventsHostedByUserById/:id', getEventsHostedByUserById);

export default router;
