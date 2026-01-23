import { IEventControllerAttendeeUpdateDto } from "../dtos/IEventControllerAttendeeUpdateDto";
import { IEventController } from "../models/IEventController";


export interface IEventControllerAttendeeRepository {
    getController(eventId: number, userId: number): Promise<IEventController | null>;
    createControllerAssignment(eventId: number, userId: number, airportId: number, positionId: number): Promise<boolean>;
    updateControllerAssignment(eventId: number, userId: number, change: IEventControllerAttendeeUpdateDto): Promise<boolean>;
    deleteControllerAssignment(eventId: number, userId: number): Promise<boolean>;
}