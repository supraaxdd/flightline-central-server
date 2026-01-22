import { EventControllerAttendeeRepository } from "../infrastructure/repositories/EventControllerAttendeeRepository";

export class EventControllerAttendeeService {
    private ecaRepo: EventControllerAttendeeRepository = new EventControllerAttendeeRepository();

    getController = async (eventId: number, userId: number) => await this.ecaRepo.getController(eventId, userId);

    updateControllerAssignment = async (eventId: number, userId: number) => await this.ecaRepo.updateControllerAssignment(eventId, userId);
}