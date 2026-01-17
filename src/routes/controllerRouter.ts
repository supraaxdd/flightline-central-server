import { Router } from "express";
import { createController, deleteController, getControllerById, updateController } from "../controllers/ControllerHttpController";

const router = Router();

router.get('/:id', getControllerById);
router.post('/:id', createController);
router.delete('/:id', deleteController);
router.put('/:id', updateController);

export default router;