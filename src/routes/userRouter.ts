import { Router } from "express";
import { getUserById, getUserByDiscordId } from "../controllers/userController";

const router = Router();

router.get('/getById/:id', getUserById);
router.get('/getByDiscordId/:id', getUserByDiscordId);

export default router;