import { Request, Response } from "express";
import { EventControllerAttendeeUpdateParameter, EventCreateParameter, EventUpdateParameter, IdParameter } from "./RequestTypes";
import { EventService } from "../services/EventService";
import { IEventUpdateDto } from "../infrastructure/dtos/IEventUpdateDto";
import { IEventControllerAttendeeUpdateDto } from "../infrastructure/dtos/IEventControllerAttendeeUpdateDto";

const eventService: EventService = new EventService();

export const getEventById = async (req: Request<IdParameter>, res: Response) => {
    try {
        const { id } = req.params;
        const event = await eventService.getEventById(id);
        res.status(200).json(event);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}

export const getEventsHostedByUserById = async (req: Request<IdParameter>, res: Response) => {
    try {
        const { id } = req.params;
        const events = await eventService.getEventsHostedByUserById(id);
        res.status(200).json(events);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}

export const createEvent = async (req: Request<EventCreateParameter>, res: Response) => {
    try {
        const { hostId, dateHosted } = req.params;
        const success = await eventService.createEvent(hostId, dateHosted);
        res.status(200).json(success);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}

export const updateEvent = async (req: Request<EventUpdateParameter, object, EventControllerAttendeeUpdateParameter>, res: Response) => {
    try {
        // const { hostId, dateHosted } = req.params;
        // const { airportId, positionId } = req.body;

        // const eventUpdateDto: IEventUpdateDto = {};
        // const eventControllerAttendeeUpdateDto: IEventControllerAttendeeUpdateDto = {};

        // if (hostId !== undefined) {
        //     eventUpdateDto.hostId = hostId;
        // }

        // if (dateHosted !== undefined) {
        //     eventUpdateDto.dateHosted = dateHosted;
        // }

        // if (userId !== undefined) {
        //     eventControllerAttendeeUpdateDto.userId = userId;
        // }

        // if (airportId !== undefined) {
        //     eventControllerAttendeeUpdateDto.airportId = airportId;
        // }

        // if (positionId !== undefined) {
        //     eventControllerAttendeeUpdateDto.positionId = positionId;
        // }
        
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}