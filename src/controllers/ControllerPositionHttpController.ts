import { Request, Response } from "express";
import { ControllerPositionService } from "../services/ControllerPositionService";
import { IdParameter, NameParameter, IdentifierParameter } from "./RequestTypes";

const positionService: ControllerPositionService = ControllerPositionService.getInstance();

export const getPositionById = async (req: Request<IdParameter>, res: Response) => {
	const { id } = req.params;
	const position = await positionService.getById(id);
	res.status(200).json(position);
}

export const getPositionByName = async (req: Request<NameParameter>, res: Response) => {
	const { name } = req.params;
	const position = await positionService.getByName(name);
	res.status(200).json(position);
}

export const getAllPositions = async (_req: Request, res: Response) => {
	const positions = await positionService.getAll();
	res.status(200).json(positions);
}

export const resolvePosition = async (req: Request<IdentifierParameter>, res: Response) => {
	const { identifier } = req.params;
	const position = await positionService.resolvePosition(identifier);
	res.status(200).json(position);
}
