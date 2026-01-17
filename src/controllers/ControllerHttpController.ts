import { Request, Response } from "express";
import { IdParameter } from "./RequestTypes";
import { ControllerService } from "../services/ControllerService";

const controllerService: ControllerService = new ControllerService();

export const getControllerById = async (req: Request<IdParameter>, res: Response) => {
    try {
        const { id } = req.params;
        const controller = await controllerService.getByUserId(id);
        res.status(200).json(controller);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}
    
export const createController = async (req: Request<IdParameter>, res: Response) => {
    try {
        const { id } = req.params;
        const success = await controllerService.createController(id);
        res.status(201).json(success);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}
    
export const deleteController = async (req: Request<IdParameter>, res: Response) => {
    try {
        const { id } = req.params;
        const success = await controllerService.deleteController(id);
        res.status(200).json(success);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}

export const updateController = async (req: Request<IdParameter>, res: Response) => {
    try {
        const { id } = req.params;
        const success = await controllerService.updateController(id);
        res.status(200).json(success);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}