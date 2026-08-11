import { Request, Response } from "express";
import { EventControllerAttendeeService } from "../services/EventControllerAttendeeService";
import { EventControllerAttendeeCreationParameter, EventControllerAttendeeIdParameter, EventControllerAttendeeUpdateParameter } from "./RequestTypes";
import { IEventControllerAttendeeUpdateDto } from "../infrastructure/dtos/IEventControllerAttendeeUpdateDto";

const ecaService: EventControllerAttendeeService = EventControllerAttendeeService.getInstance();

export const getController = async (req: Request<EventControllerAttendeeIdParameter>, res: Response) => {
    const { eventId, userId } = req.params;
    const eventController = await ecaService.getController(eventId, userId);
    res.status(200).json(eventController);
}

export const createControllerAssignment = async (req: Request<EventControllerAttendeeCreationParameter>, res: Response) => {
    const { eventId, userId, airportId, positionId } = req.params;

    const success = await ecaService.createControllerAssignment(eventId, userId, airportId, positionId);
    res.status(200).json(success);
}

export const updateControllerAssignment = async (req: Request<EventControllerAttendeeIdParameter, object, EventControllerAttendeeUpdateParameter>, res: Response) => {
    const { eventId, userId } = req.params;
    const { airportId, positionId } = req.body;

    const updateDto: IEventControllerAttendeeUpdateDto = {};

    if (airportId !== undefined) {
        updateDto.airportId = airportId;
    }

    if (positionId !== undefined) {
        updateDto.positionId = positionId;
    }

    const success = await ecaService.updateControllerAssignment(eventId, userId, updateDto);

    res.status(200).json(success);
}

export const deleteControllerAssignment = async (req: Request<EventControllerAttendeeIdParameter>, res: Response) => {
    const { eventId, userId } = req.params;

    const success = await ecaService.deleteControllerAssignment(eventId, userId);
    res.status(200).json(success);
}
