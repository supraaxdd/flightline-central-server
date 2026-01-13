import { ControllerRepository } from "../infrastructure/repositories/ControllerRepository";
import { Request, Response } from "express";
import { IController } from "../infrastructure/models/IController";
import { IdParameter, DiscordIdParameter, UsernameParameter } from "./serviceTypes";
import { IControllerPosition } from "../infrastructure/models/IControllerPosition";

const controllerRepo: ControllerRepository = new ControllerRepository();

export const getControllerById = async (req: Request<IdParameter>, res: Response) => {
    try {
        const { id } = req.params;

        const controller: IController | null = await controllerRepo.getControllerById(id);
        res.status(200).json(controller);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}

export const getControllerByDiscordId = async (req: Request<DiscordIdParameter>, res: Response) => {
    try {
        const { discordId } = req.params;

        const controller: IController | null = await controllerRepo.getControllerByDiscordId(discordId);
        res.status(200).json(controller);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}

export const getControllerByUsername = async (req: Request<UsernameParameter>, res: Response) => {
    try {
        const { username } = req.params;

        const controller: IController | null = await controllerRepo.getControllerByUsername(username);
        res.status(200).json(controller);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}

export const getControllerQualificationById = async (req: Request<IdParameter>, res: Response) => {
    try {
        const { id } = req.params;

        const controllerQualifcation: IControllerPosition | null = await controllerRepo.getControllerQualificationById(id);
        res.status(200).json(controllerQualifcation);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}

export const getControllerQualificationByDiscordId = async (req: Request<DiscordIdParameter>, res: Response) => {
    try {
        const { discordId } = req.params;

        const controllerQualifcation: IControllerPosition | null = await controllerRepo.getControllerQualificationByDiscordId(discordId);
        res.status(200).json(controllerQualifcation);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}

export const getControllerQualificationByUsername = async (req: Request<UsernameParameter>, res: Response) => {
    try {
        const { username } = req.params;

        const controllerQualifcation: IControllerPosition | null = await controllerRepo.getControllerQualificationByUsername(username);
        res.status(200).json(controllerQualifcation);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}