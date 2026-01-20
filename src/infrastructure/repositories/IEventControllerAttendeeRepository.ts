import { IEventController } from "../models/IEventController";


export interface IEventControllerAttendeeRepository {
    getControllerAssignment(eventId: number, userId: number): Promise<IEventController | null>;
    updateControllerAssignment(eventId: number, userId: number): Promise<boolean>;
}