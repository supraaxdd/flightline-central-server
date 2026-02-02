import { IEventSummaryDto } from "../dtos/IEventSummaryDto";
import { IEventUpdateDto } from "../dtos/IEventUpdateDto";
import { IEvent } from "../models/IEvent";

export interface IEventRepository {
    getEventById(id: number): Promise<IEvent | null>;
    getEventsHostedByUserById(userId: number): Promise<IEventSummaryDto[] | null>;
    exists(id: number): Promise<boolean>;
    create(userId: number, dateHosted: Date): Promise<void>;
    delete(id: number): Promise<void>;
    update(id: number, change: IEventUpdateDto): Promise<void>;
}