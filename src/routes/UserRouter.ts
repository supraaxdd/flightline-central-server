import { Router } from "express";
import { getUserById, getUserByDiscordId, getUserByUsername, createUser, deleteUser, updateUser, getRoles } from "../controllers/UserHttpController";

const router = Router();

router.get('/getById/:id', getUserById);
router.get('/getByDiscordId/:discordId', getUserByDiscordId);
router.get('/getByUsername/:username', getUserByUsername);
router.get('/getRoles/:id', getRoles);
router.post('/:discordId/:username', createUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

export default router;
