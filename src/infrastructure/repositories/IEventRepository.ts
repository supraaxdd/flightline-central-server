import { IEventSummaryDto } from "../dtos/IEventSummaryDto";
import { IEvent } from "../models/IEvent";

export interface IEventRepository {
    getEventById(id: number): Promise<IEvent | null>;
    getEventsHostedByUserById(userId: number): Promise<IEventSummaryDto[] | null>;
    getEventsHostedByUserByDiscordId(discordId: string): Promise<IEventSummaryDto[] | null>;
    getEventsHostedByUserByUsername(username: string): Promise<IEventSummaryDto[] | null>;
}