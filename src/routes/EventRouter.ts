import { Router } from "express";
import { getEventById, getEventsHostedByUserById, createEvent, updateEvent, deleteEvent } from "../controllers/EventHttpController";

const router = Router();

router.get('/:id', getEventById);
router.get('/getEventsHostedByUserById/:id', getEventsHostedByUserById);
router.post('/:hostId/:dateHosted', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;
