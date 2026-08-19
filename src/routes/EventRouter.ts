import { Router } from "express";
import { getEventById, getEventsHostedByUserById, getActiveEvents, createEvent, updateEvent, deleteEvent } from "../controllers/EventHttpController";

const router = Router();

router.get('/active', getActiveEvents);
router.get('/getEventsHostedByUserById/:id', getEventsHostedByUserById);
router.get('/:id', getEventById);
router.post('/:hostId/:dateHosted', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;
