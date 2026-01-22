import { IEventController } from "../models/IEventController";


export interface IEventControllerAttendeeRepository {
    getController(eventId: number, userId: number): Promise<IEventController | null>;
    updateControllerAssignment(eventId: number, userId: number): Promise<boolean>;
}