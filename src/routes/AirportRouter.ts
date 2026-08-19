import { Router } from "express";
import { getAirportById, getAirportByName, getAllAirports, resolveAirport } from "../controllers/AirportHttpController";

const router = Router();

router.get('/getById/:id', getAirportById);
router.get('/getByName/:name', getAirportByName);
router.get('/getAll', getAllAirports);
router.get('/resolve/:identifier', resolveAirport);

export default router;
