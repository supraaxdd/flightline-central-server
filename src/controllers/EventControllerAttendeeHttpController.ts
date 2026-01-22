import { Request, Response } from "express";
import { EventControllerAttendeeService } from "../services/EventControllerAttendeeService";
import { EventControllerAttendeeIdParameter } from "./RequestTypes";

const ecaService: EventControllerAttendeeService = new EventControllerAttendeeService();

export const getController = async (req: Request<EventControllerAttendeeIdParameter>, res: Response) => {
    try {
        const { eventId, userId } = req.params;
        const eventController = await ecaService.getController(eventId, userId);
        res.status(200).json(eventController);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}

export const updateControllerAssignment = async (req: Request<EventControllerAttendeeIdParameter>, res: Response) => {
    throw new Error("Method not implemented yet.");
}