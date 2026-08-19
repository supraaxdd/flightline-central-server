import { Request, Response } from "express";
import { AirportService } from "../services/AirportService";
import { IdParameter, NameParameter, IdentifierParameter } from "./RequestTypes";

const airportService: AirportService = AirportService.getInstance();

export const getAirportById = async (req: Request<IdParameter>, res: Response) => {
	const { id } = req.params;
	const airport = await airportService.getById(id);
	res.status(200).json(airport);
}

export const getAirportByName = async (req: Request<NameParameter>, res: Response) => {
	const { name } = req.params;
	const airport = await airportService.getByName(name);
	res.status(200).json(airport);
}

export const getAllAirports = async (_req: Request, res: Response) => {
	const airports = await airportService.getAll();
	res.status(200).json(airports);
}

export const resolveAirport = async (req: Request<IdentifierParameter>, res: Response) => {
	const { identifier } = req.params;
	const airport = await airportService.resolveAirport(identifier);
	res.status(200).json(airport);
}
