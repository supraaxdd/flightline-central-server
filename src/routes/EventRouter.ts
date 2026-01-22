import { Router } from "express";
import { getEventById, getEventsHostedByUserById, createEvent, updateEvent } from "../controllers/EventHttpController";

const router = Router();

router.get('/:id', getEventById);
router.get('/getEventsHostedByUserById/:id', getEventsHostedByUserById);
router.post('/:hostId/:dateHosted', createEvent);
router.put('/updateEvent', updateEvent);

export default router;
