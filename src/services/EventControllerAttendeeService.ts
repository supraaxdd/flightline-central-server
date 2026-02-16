import { IEventControllerAttendeeUpdateDto } from "../infrastructure/dtos/IEventControllerAttendeeUpdateDto";
import { EventControllerAttendeeRepository } from "../infrastructure/repositories/EventControllerAttendeeRepository";
import { AirportService } from "./AirportService";
import { ControllerPositionService } from "./ControllerPositionService";
import { UserService } from "./UserService";

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
    private userService: UserService = UserService.getInstance();
    private airportService: AirportService = AirportService.getInstance();
    private positionService: ControllerPositionService = ControllerPositionService.getInstance();

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
        if (exists) {
            throw Error("Controller Assignment already exists for this event");
        }

        const userExists = await this.userService.existsById(userId);
        if (!userExists) {
            throw Error("User not found");
        }

        const userRoles = await this.userService.getRoles(userId);
        if (!userRoles?.find(r => r.name === "Controller")) {
            throw Error("User does not have permission to be a controller");
        }

        const airportExists = await this.airportService.exists(airportId);
        if (!airportExists) {
            throw Error("Airport not found");
        }

        const positionExists = await this.positionService.exists(positionId);
        if (!positionExists) {
            throw Error("Position not found");
        }

        return await this.ecaRepo.createControllerAssignment(eventId, userId, airportId, positionId);
    }

    public async updateControllerAssignment(
        eventId: number,
        userId: number,
        change: IEventControllerAttendeeUpdateDto
    ) {
        const exists = await this.controllerAssignmentExists(eventId, userId);
        if (!exists) {
            throw Error("Controller Assignment not found");
        };

        // Here we don't check if the user exists because if the assignment exists, that means that
        // a valid user was already being used for the assignment.
        // We will not allow to change to user of the assignment, instead it will have to be replaced,
        // because it is a primary key in the database as a composite PK
        // This may be subject to change in the future

        if (change.airportId !== undefined) {
            const airportExists = await this.airportService.exists(change.airportId);
            if (!airportExists) {
                throw Error("Airport not found");
            }
        }

        if (change.positionId !== undefined) {
            const positionExists = await this.positionService.exists(change.positionId);
            if (!positionExists) {
                throw Error("Position not found");
            }
        }
        
        return await this.ecaRepo.updateControllerAssignment(eventId, userId, change);
    }

    public async deleteControllerAssignment(
        eventId: number,
        userId: number
    ) {
        const exists = await this.controllerAssignmentExists(eventId, userId);
        if (!exists) {
            throw Error("Controller Assignment not found");
        }

        return await this.ecaRepo.deleteControllerAssignment(eventId, userId);
    }
}