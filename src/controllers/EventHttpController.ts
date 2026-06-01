import { Request, Response } from "express";
import { EventCreateParameter, EventUpdateParameter, IdParameter } from "./RequestTypes";
import { EventService } from "../services/EventService";
import { IEventUpdateDto } from "../infrastructure/dtos/IEventUpdateDto";

const eventService: EventService = EventService.getInstance();

export const getEventById = async (req: Request<IdParameter>, res: Response) => {
    try {
        const { id } = req.params;
        const event = await eventService.getEventById(id);
        res.status(200).json(event);
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

export const getEventsHostedByUserById = async (req: Request<IdParameter>, res: Response) => {
    try {
        const { id } = req.params;
        const events = await eventService.getEventsHostedByUserById(id);
        res.status(200).json(events);
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

export const createEvent = async (req: Request<EventCreateParameter>, res: Response) => {
    try {
        const { hostId, dateHosted } = req.params;
        const success = await eventService.createEvent(hostId, dateHosted);
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

export const deleteEvent = async (req: Request<IdParameter>, res: Response) => {
    try {
        const { id } = req.params;
        const success = await eventService.deleteEvent(id);
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

export const updateEvent = async (req: Request<IdParameter, object, EventUpdateParameter>, res: Response) => {
    try {
        const { id } = req.params;
        const eventId = id;

        const { hostId, dateHosted } = req.body;

        const updateDto: IEventUpdateDto = {};

        if (hostId !== undefined) {
            updateDto.hostId = hostId;
        }

        if (dateHosted !== undefined) {
            updateDto.dateHosted = dateHosted;
        }

        const success = await eventService.updateEvent(eventId, updateDto);
        
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