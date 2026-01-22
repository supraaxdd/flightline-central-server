import { Router } from "express";
import { getController } from "../controllers/EventControllerAttendeeHttpController";

const router = Router();

router.get('/:eventId/:userId', getController);

export default router;