import { EventRepository } from "../infrastructure/repositories/EventRepository";
import { Request, Response } from "express";
import { IdParameter, DiscordIdParameter, UsernameParameter } from "../controllers/RequestTypes";
import { IEvent } from "../infrastructure/models/IEvent";
import { IEventSummaryDto } from "../infrastructure/dtos/IEventSummaryDto";

const eventRepo: EventRepository = new EventRepository();

export const getEventById = async (req: Request<IdParameter>, res: Response) => {
    try {
        const { id } = req.params;

        const event: IEvent | null = await eventRepo.getEventById(id);
        res.status(200).json(event);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}

export const getEventsHostedByUserById = async (req: Request<IdParameter>, res: Response) => {
    try {
        const { id } = req.params;

        const events: IEventSummaryDto[] | null = await eventRepo.getEventsHostedByUserById(id);
        res.status(200).json(events);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}

export const getEventsHostedByUserByDiscordId = async (req: Request<DiscordIdParameter>, res: Response) => {
    try {
        const { discordId } = req.params;

        const events: IEventSummaryDto[] | null = await eventRepo.getEventsHostedByUserByDiscordId(discordId);
        res.status(200).json(events);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}

export const getEventsHostedByUserByUsername = async (req: Request<UsernameParameter>, res: Response) => {
    try {
        const { username } = req.params;

        const events: IEventSummaryDto[] | null = await eventRepo.getEventsHostedByUserByUsername(username);
        res.status(200).json(events); 
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}