import { ControllerRepository } from "../infrastructure/repositories/ControllerRepository";
import { Request, Response } from "express";
import { IController } from "../infrastructure/models/IController";
import { IdParameter, DiscordIdParameter, UsernameParameter } from "../controllers/RequestTypes";

const controllerRepo: ControllerRepository = new ControllerRepository();

export const getControllerById = async (req: Request<IdParameter>, res: Response) => {
    try {
        const { id } = req.params;

        const controller: IController | null = await controllerRepo.getByUserId(id);
        res.status(200).json(controller);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}

export const createController = async (req: Request<IdParameter>, res: Response) => {
    try {
        const { id } = req.params;

        const success: boolean = await controllerRepo.create(id);
        res.status(201).json(success);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}

export const deleteController = async (req: Request<IdParameter>, res: Response) => {
    try {
        const { id } = req.params;

        const success: boolean = await controllerRepo.delete(id);
        res.status(200).json(success);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}

export const updateController = async (req: Request<IdParameter>, res: Response) => {

}