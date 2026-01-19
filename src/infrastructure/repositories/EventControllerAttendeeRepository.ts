import { IEventController } from "../models/IEventController";
import { IEventControllerAttendeeRepository } from "./IEventControllerAttendeeRepository";


export class EventControllerAttendeeRepository implements IEventControllerAttendeeRepository {
    public async getAttendee(eventId: number, userId: number): Promise<IEventController | null> {
        throw new Error("Method not implemented yet.");
    }

    public async updateAttendee(eventId: number, userId: number): Promise<boolean> {
        throw new Error("Method not implemented yet.");
    }
}