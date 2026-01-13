import { IEvent } from "../models/IEvent";

export interface IEventRepository {
    getEventById(id: number): Promise<IEvent | null>;
    getEventsHostedByUserById(userId: number): Promise<IEvent[] | null>;
    getEventsHostedByUserByDiscordId(discordId: string): Promise<IEvent[] | null>;
    getEventsHostedByUserByUsername(username: string): Promise<IEvent[] | null>;
}