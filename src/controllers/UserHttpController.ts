import { Request, Response } from "express";
import { IdParameter, DiscordIdParameter, UsernameParameter, UserDataParameter, UserUpdateParameter } from "./RequestTypes";
import { UserService } from "../services/UserService";
import { IUserUpdateDto } from "../infrastructure/dtos/IUserUpdateDto";

const userService: UserService = UserService.getInstance();

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

        // Preparation for custom error classes, as once those are introduced, we can add cases here to 
        // differentiate between these errors and handle them accordingly

        // Postman cannot show error objects as they are not serialized to JSON, so simply logging the error to console
        // works since all of that happens under the hood but postman cannot deal with it, hence the logic below
        if (e instanceof Error) {
            res.status(500).json({
                error: e.name,
                message: e.message
            });
        } else {
            res.status(500).json({
                error: "UnknownError",
                message: "Something went wrong"
            });
        }
    }
}

export const deleteUser = async (req: Request<IdParameter>, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userService.deleteUser(id);
        res.status(200).json(result);
    } catch (e) {
        console.error(e);

        if (e instanceof Error) {
            res.status(500).json({
                error: e.name,
                message: e.message
            });
        } else {
            res.status(500).json({
                error: "UnknownError",
                message: "Something went wrong"
            });
        }
    }
}

export const createUser = async (req: Request<UserDataParameter>, res: Response) => {
    try {
        const { discordId, username } = req.params;
        const result = await userService.createUser(discordId, username);
        res.status(201).json(result);
    } catch (e) {
        console.error(e);
        
        if (e instanceof Error) {
            res.status(500).json({
                error: e.name,
                message: e.message
            });
        } else {
            res.status(500).json({
                error: "UnknownError",
                message: "Something went wrong"
            });
        }
    } 
}

export const updateUser = async (req: Request<IdParameter, object, UserUpdateParameter>, res: Response) => {
    try {
        const { id } = req.params;
        const { discordId, username } = req.body;

        const updateDto: IUserUpdateDto = {};

        if (discordId !== undefined) {
            updateDto.discordId = discordId;
        }

        if (username !== undefined) {
            updateDto.username = username;
        }

        const success = await userService.updateUser(id, updateDto);
        res.status(200).json(success);
    } catch (e) {
        console.error(e);
        
        if (e instanceof Error) {
            res.status(500).json({
                error: e.name,
                message: e.message
            });
        } else {
            res.status(500).json({
                error: "UnknownError",
                message: "Something went wrong"
            });
        }
    }
}