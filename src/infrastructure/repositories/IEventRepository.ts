import { IEventSummaryDto } from "../dtos/IEventSummaryDto";
import { IEvent } from "../models/IEvent";

export interface IEventRepository {
    getEventById(id: number): Promise<IEvent | null>;
    getEventsHostedByUserById(userId: number): Promise<IEventSummaryDto[] | null>;
    create(userId: number, dateHosted: Date): Promise<boolean>;
    update(id: number): Promise<boolean>; // Parameters to be expanded to include updating event controller attendees
}