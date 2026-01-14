import { Router } from "express";
import { getEventById, getEventsHostedByUserByDiscordId, getEventsHostedByUserById, getEventsHostedByUserByUsername } from "../services/eventService";

const router = Router();

router.get('/getById/:id', getEventById);
router.get('/getEventsHostedByUserById/:id', getEventsHostedByUserById);
router.get('/getEventsHostedByUserByDiscordId/:id', getEventsHostedByUserByDiscordId);
router.get('/getEventsHostedByUserByUsername/:username', getEventsHostedByUserByUsername);

export default router;