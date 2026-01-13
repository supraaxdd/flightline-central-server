import { Router } from "express";
import { getControllerByDiscordId, getControllerById, getControllerByUsername, getControllerQualificationByDiscordId, getControllerQualificationById, getControllerQualificationByUsername } from "../services/controllerService";

const router = Router();

router.get('/getById/:id', getControllerById);
router.get('/getByDiscordId/:discordId', getControllerByDiscordId);
router.get('/getByUsername/:username', getControllerByUsername);
router.get('/getQualificationById/:id', getControllerQualificationById);
router.get('/getQualificationByDiscordId/:discordId', getControllerQualificationByDiscordId);
router.get('/getQualificationByUsername/:username', getControllerQualificationByUsername);

export default router;