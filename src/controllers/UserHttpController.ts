import { Request, Response } from "express";
import { IdParameter, DiscordIdParameter, UsernameParameter, UserDataParameter } from "./RequestTypes";
import { UserService } from "../services/UserService";

const userService: UserService = new UserService();

export const getUserById = async (req: Request<IdParameter>, res: Response) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        res.status(200).json(user);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}

export const getUserByDiscordId = async (req: Request<DiscordIdParameter>, res: Response) => {
    try {
        const { discordId } = req.params;
        const user = await userService.getUserByDiscordId(discordId);
        res.status(200).json(user);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}

export const getUserByUsername = async (req: Request<UsernameParameter>, res: Response) => {
    try {
        const { username } = req.params;
        const user = await userService.getUserByUsername(username);
        res.status(200).json(user);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}

export const getRoles = async (req: Request<IdParameter>, res: Response) => {
    try {
        const { id } = req.params;
        const roles = await userService.getRoles(id);
        res.status(200).json(roles);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}

export const deleteUser = async (req: Request<IdParameter>, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userService.deleteUser(id);
        res.status(200).json(result);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}

export const createUser = async (req: Request<UserDataParameter>, res: Response) => {
    try {
        const { discordId, username } = req.params;
        const result = await userService.createUser(discordId, username);
        res.status(201).json(result);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    } 
}