import { Router } from "express";
import { getController, updateControllerAssignment, createControllerAssignment, deleteControllerAssignment } from "../controllers/EventControllerAttendeeHttpController";

const router = Router();

router.get('/:eventId/:userId', getController);
router.post('/:eventId/:userId/:airport/:position', createControllerAssignment);
router.put('/:eventId/:userId', updateControllerAssignment);
router.delete('/:eventId/:userId', deleteControllerAssignment);

export default router;