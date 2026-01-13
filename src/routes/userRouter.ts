import { Router } from "express";
import { getUserById, getUserByDiscordId, getUserByUsername, getUserWithRolesById, getUserWithRolesByDiscordId, getUserWithRolesByUsername, createUser, deleteUserById, deleteUserByDiscordId, deleteUserByUsername } from "../controllers/userController";

const router = Router();

router.get('/getById/:id', getUserById);
router.get('/getByDiscordId/:discordId', getUserByDiscordId);
router.get('/getByUsername/:username', getUserByUsername);
router.get('/getWithRolesById/:id', getUserWithRolesById);
router.get('/getWithRolesByDiscordId/:discordId', getUserWithRolesByDiscordId);
router.get('/getWithRolesByUsername/:username', getUserWithRolesByUsername);
router.post('/createUser/:id/:username', createUser);
router.delete('/deleteById/:id', deleteUserById);
router.delete('/deleteById/:discordId', deleteUserByDiscordId);
router.delete('/deleteById/:username', deleteUserByUsername);

export default router;