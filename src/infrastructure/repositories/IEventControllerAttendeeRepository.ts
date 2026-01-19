import { IEventController } from "../models/IEventController";


export interface IEventControllerAttendeeRepository {
    getAttendee(eventId: number, userId: number): Promise<IEventController | null>;
    updateAttendee(eventId: number, userId: number): Promise<boolean>;
}