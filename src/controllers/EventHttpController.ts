import { Request, Response } from "express";
import { EventCreateParameter, EventUpdateParameter, IdParameter } from "./RequestTypes";
import { EventService } from "../services/EventService";
import { IEventUpdateDto } from "../infrastructure/dtos/IEventUpdateDto";

const eventService: EventService = EventService.getInstance();

export const getEventById = async (req: Request<IdParameter>, res: Response) => {
    const { id } = req.params;
    const event = await eventService.getEventById(id);
    res.status(200).json(event);
}

export const getEventsHostedByUserById = async (req: Request<IdParameter>, res: Response) => {
    const { id } = req.params;
    const events = await eventService.getEventsHostedByUserById(id);
    res.status(200).json(events);
}

export const getActiveEvents = async (_req: Request, res: Response) => {
    const events = await eventService.getActiveEvents();
    res.status(200).json(events);
}

export const createEvent = async (req: Request<EventCreateParameter>, res: Response) => {
    const { hostId, dateHosted } = req.params;
    const success = await eventService.createEvent(hostId, dateHosted);
    res.status(200).json(success);
}

export const deleteEvent = async (req: Request<IdParameter>, res: Response) => {
    const { id } = req.params;
    const success = await eventService.deleteEvent(id);
    res.status(200).json(success);
}

export const updateEvent = async (req: Request<IdParameter, object, EventUpdateParameter>, res: Response) => {
    const { id } = req.params;
    const eventId = id;

    const { hostId, dateHosted, active } = req.body;

    const updateDto: IEventUpdateDto = {};

    if (hostId !== undefined) {
        updateDto.hostId = hostId;
    }

    if (dateHosted !== undefined) {
        updateDto.dateHosted = dateHosted;
    }

    if (active !== undefined) {
        updateDto.active = active;
    }

    const success = await eventService.updateEvent(eventId, updateDto);

    res.status(200).json(success);
}
