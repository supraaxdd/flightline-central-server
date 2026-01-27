import { IEventControllerAttendeeUpdateDto } from "../infrastructure/dtos/IEventControllerAttendeeUpdateDto";
import { EventControllerAttendeeRepository } from "../infrastructure/repositories/EventControllerAttendeeRepository";

export class EventControllerAttendeeService {
    private static instance?: EventControllerAttendeeService;

    private constructor() { };

    public static getInstance() {
        if (!EventControllerAttendeeService.instance) {
            EventControllerAttendeeService.instance = new EventControllerAttendeeService();
        }

        return EventControllerAttendeeService.instance;
    }
    
    private ecaRepo: EventControllerAttendeeRepository = EventControllerAttendeeRepository.getInstance();

    public async getController(eventId: number, userId: number) {
        return await this.ecaRepo.getController(eventId, userId);
    }

    public async controllerAssignmentExists(eventId: number, userId: number) {
        return await this.ecaRepo.controllerAssignmentExists(eventId, userId);
    }

    public async createControllerAssignment(
        eventId: number,
        userId: number,
        airportId: number,
        positionId: number
    ) {
        const exists = await this.controllerAssignmentExists(eventId, userId);

        // Future implementation of the error class story... ref. User/Event services for more in depth explanations
        if (exists) return false;
        return await this.ecaRepo.createControllerAssignment(eventId, userId, airportId, positionId);
    }

    public async updateControllerAssignment(
        eventId: number,
        userId: number,
        change: IEventControllerAttendeeUpdateDto
    ) {
        const exists = await this.controllerAssignmentExists(eventId, userId);

        // Future implementation of the error class story... ref. User/Event services for more in depth explanations
        if (!exists) return false;
        return await this.ecaRepo.updateControllerAssignment(eventId, userId, change);
    }

    public async deleteControllerAssignment(
        eventId: number,
        userId: number
    ) {
        const exists = await this.controllerAssignmentExists(eventId, userId);

        // Future implementation of the error class story... ref. User/Event services for more in depth explanations
        if (!exists) return true;
        return await this.ecaRepo.deleteControllerAssignment(eventId, userId);
    }
}