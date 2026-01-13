import { UserRepository } from "../infrastructure/repositories/UserRepository"
import { Request, Response } from "express";
import { IUser } from "../infrastructure/models/IUser";
import { IdParameter, DiscordIdParameter, UsernameParameter } from "./serviceTypes";

const userRepo: UserRepository = new UserRepository();

export const getUserById = async (req: Request<IdParameter>, res: Response) => {
	try {
		const { id } = req.params;

		const user: IUser | null = await userRepo.getUserById(id);
		res.status(200).json(user);
	} catch (e) {
		console.error(e);
		res.status(500).json(e);
	}
}

export const getUserByDiscordId = async (req: Request<DiscordIdParameter>, res: Response) => {
	try {
		const { discordId } = req.params
		
		const user: IUser | null = await userRepo.getUserByDiscordId(discordId);
		res.status(200).json(user);
	} catch (e) {
		console.error(e);
		res.status(500).json(e);
	}
}

export const getUserByUsername = async (req: Request<UsernameParameter>, res: Response) => {
	try {
		const { username } = req.params;

		const user: IUser | null = await userRepo.getUserByUsername(username);
		res.status(200).json(user);
	} catch (e) {
		console.error(e);
		res.status(500).json(e);
	}
}

export const getUserWithRolesById = async (req: Request<IdParameter>, res: Response) => {
	try {
		const { id } = req.params;

		const user: IUser | null = await userRepo.getUserWithRolesById(id);
		res.status(200).json(user);
	} catch (e) {
		console.error(e);
		res.status(500).json(e);
	}
}

export const getUserWithRolesByDiscordId = async (req: Request<DiscordIdParameter>, res: Response) => {
	try {
		const { discordId } = req.params;

		const user: IUser | null = await userRepo.getUserWithRolesByDiscordId(discordId);
		res.status(200).json(user);
	} catch (e) {
		console.error(e);
		res.status(500).json(e);
	}
}

export const getUserWithRolesByUsername = async (req: Request<UsernameParameter>, res: Response) => {
	try {
		const { username } = req.params;

		const user: IUser | null = await userRepo.getUserWithRolesByUsername(username);
		res.status(200).json(user);
	} catch (e) {
		console.error(e);
		res.status(500).json(e);
	}
}

export const createUser = async (req: Request<{ discordId: string, username: string }>, res: Response) => {
	const { discordId, username } = req.params;

	const success = await userRepo.createUser(discordId, username);

	if (success) res.status(200);
	else res.status(500);
}

export const deleteUserById = async (req: Request<IdParameter>, res: Response) => {
	const { id } = req.params;

	const success = await userRepo.deleteUserById(id);

	if (success) res.status(200);
	else res.status(500);
}

export const deleteUserByDiscordId = async (req: Request<DiscordIdParameter>, res: Response) => {
	const { discordId } = req.params;

	const success = await userRepo.deleteUserByDiscordId(discordId);

	if (success) res.status(200);
	else res.status(500);
}

export const deleteUserByUsername = async (req: Request<UsernameParameter>, res: Response) => {
	const { username } = req.params;

	const success = await userRepo.deleteUserByUsername(username);

	if (success) res.status(200);
	else res.status(500);
}