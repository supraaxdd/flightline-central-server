import { IEvent } from "../models/IEvent";

export interface IEventRepository {
    getEventById(id: number): IEvent;
    getEventsHostedByUserById(userId: number): IEvent[];
    getEventsHostedByUserByDiscordId(userDiscordId: string): IEvent[];
}