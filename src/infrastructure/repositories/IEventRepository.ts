import { IEventSummaryDto } from "../dtos/IEventSummaryDto";
import { IEventUpdateDto } from "../dtos/IEventUpdateDto";
import { IEvent } from "../models/IEvent";

export interface IEventRepository {
    getEventById(id: number): Promise<IEvent | null>;
    getEventsHostedByUserById(userId: number): Promise<IEventSummaryDto[] | null>;
    create(userId: number, dateHosted: Date): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    update(id: number, change: IEventUpdateDto): Promise<boolean>;
}