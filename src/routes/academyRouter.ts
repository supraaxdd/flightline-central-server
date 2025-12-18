import { Router } from "express";
import { getStudentById } from "../controllers/academyController";

const router = Router();

router.get('/:id', getStudentById);

export default router;