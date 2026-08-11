import { Request, Response } from "express";
import { IdParameter, ControllerProfileUpdateParameter } from "./RequestTypes";
import { ControllerService } from "../services/ControllerService";
import { IControllerUpdateDto } from "../infrastructure/dtos/IControllerUpdateDto";

const controllerService: ControllerService = ControllerService.getInstance();

export const getControllerById = async (req: Request<IdParameter>, res: Response) => {
    const { id } = req.params;
    const controller = await controllerService.getByUserId(id);
    res.status(200).json(controller);
}
    
export const createController = async (req: Request<IdParameter>, res: Response) => {
    const { id } = req.params;
    const success = await controllerService.createController(id);
    res.status(201).json(success);
}
    
export const deleteController = async (req: Request<IdParameter>, res: Response) => {
    const { id } = req.params;
    const success = await controllerService.deleteController(id);
    res.status(200).json(success);
}

export const updateController = async (req: Request<IdParameter, object, ControllerProfileUpdateParameter>, res: Response) => {
    const { id } = req.params;
    const { controllerSince, qualificationPositionId } = req.body;

    const updateDto: IControllerUpdateDto = {};

    if (controllerSince !== undefined) {
        updateDto.controllerSince = controllerSince;
    }

    if (qualificationPositionId !== undefined) {
        updateDto.qualificationPositionId = qualificationPositionId;
    }

    const success = await controllerService.updateController(id, updateDto);

    res.status(200).json(success);
}
