import { IEventControllerAttendeeUpdateDto } from "../infrastructure/dtos/IEventControllerAttendeeUpdateDto";
import { EventControllerAttendeeRepository } from "../infrastructure/repositories/EventControllerAttendeeRepository";

export class EventControllerAttendeeService {
    private ecaRepo: EventControllerAttendeeRepository = new EventControllerAttendeeRepository();

    getController = async (eventId: number, userId: number) => await this.ecaRepo.getController(eventId, userId);

    createControllerAssignment = async (
        eventId: number,
        userId: number,
        airportId: number,
        positionId: number
    ) => await this.ecaRepo.createControllerAssignment(eventId, userId, airportId, positionId);

    updateControllerAssignment = async (
        eventId: number,
        userId: number,
        change: IEventControllerAttendeeUpdateDto
    ) => await this.ecaRepo.updateControllerAssignment(eventId, userId, change);

    deleteControllerAssignment = async (
        eventId: number,
        userId: number
    ) => await this.ecaRepo.deleteControllerAssignment(eventId, userId);
}