import { UserRepository } from "../infrastructure/repositories/UserRepository"
import { Request, Response } from "express";
import { IUser } from "../infrastructure/models/IUser";

const userRepo: UserRepository = new UserRepository();

type IdParameter = { id: number };
type StringParameter = { id: string };

export const getUserById = async (req: Request<IdParameter>, res: Response) => {
	try {
		const { id } = req.params;

		const user: IUser | null = await userRepo.getUserById(id);
		res.status(200).json(user);
	} catch (e) {
		console.error(e);
	}
}

export const getUserByDiscordId = async (req: Request<StringParameter>, res: Response) => {
	try {
		const { id } = req.params
		
		const user: IUser | null = await userRepo.getUserByDiscordId(id);
		res.status(200).json(user);
	} catch (e) {
		console.error(e);
	}
}

export const getUserByUsername = async (req: Request<StringParameter>, res: Response) => {
	try {
		const { id } = req.params;

		const user: IUser | null = await userRepo.getUserByUsername(id);
		res.status(200).json(user);
	} catch (e) {
		console.error(e);
	}
}