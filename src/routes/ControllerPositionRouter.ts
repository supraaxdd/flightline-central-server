import { Router } from "express";
import { getPositionById, getPositionByName, getAllPositions, resolvePosition } from "../controllers/ControllerPositionHttpController";

const router = Router();

router.get('/getById/:id', getPositionById);
router.get('/getByName/:name', getPositionByName);
router.get('/getAll', getAllPositions);
router.get('/resolve/:identifier', resolvePosition);

export default router;
