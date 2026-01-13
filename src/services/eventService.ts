import { EventRepository } from "../infrastructure/repositories/EventRepository";
import { Request, Response } from "express";
import { IdParameter, DiscordIdParameter, UsernameParameter } from "./serviceTypes";
import { IEvent } from "../infrastructure/models/IEvent";

const controllerRepo: EventRepository = new EventRepository();

export const getEventById = async (req: Request<IdParameter>, res: Response) => {
    try {
        const { id } = req.params;

        const event: IEvent | null = await controllerRepo.getEventById(id);
        res.status(200).json(event);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}
