import { IEventControllerAttendeeUpdateDto } from "../infrastructure/dtos/IEventControllerAttendeeUpdateDto";
import { ConflictError, ErrorCode, ForbiddenError, NotFoundError } from "../infrastructure/errors";
import { EventControllerAttendeeRepository } from "../infrastructure/repositories/EventControllerAttendeeRepository";
import { AirportService } from "./AirportService";
import { ControllerPositionService } from "./ControllerPositionService";
import { UserService } from "./UserService";
import { EventService } from "./EventService";
import { ControllerService } from "./ControllerService";
import { UserRole } from "../infrastructure/enums/UserRole";

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
    private controllerService: ControllerService = ControllerService.getInstance();
    private airportService: AirportService = AirportService.getInstance();
    private positionService: ControllerPositionService = ControllerPositionService.getInstance();
    private eventService: EventService = EventService.getInstance();

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
            throw new ConflictError(
                ErrorCode.CONTROLLER_ASSIGNMENT_ALREADY_EXISTS,
                "Controller Assignment already exists for this event",
                { eventId, userId }
            );
        }

        const eventExists = await this.eventService.exists(eventId);
        if (!eventExists) {
            throw new NotFoundError(ErrorCode.EVENT_NOT_FOUND, "Event not found", { eventId });
        }

        const userExists = await this.userService.existsById(userId);
        if (!userExists) {
            throw new NotFoundError(ErrorCode.USER_NOT_FOUND, "User not found", { userId });
        }

        const userRoles = await this.userService.getRoles(userId);
        if (!userRoles?.find(r => r.name === UserRole.CONTROLLER)) {
            throw new ForbiddenError(
                ErrorCode.INSUFFICIENT_ROLE,
                "User does not have permission to be a controller",
                { userId, requiredRole: UserRole.CONTROLLER }
            );
        }

        const airportExists = await this.airportService.exists(airportId);
        if (!airportExists) {
            throw new NotFoundError(ErrorCode.AIRPORT_NOT_FOUND, "Airport not found", { airportId });
        }

        const positionExists = await this.positionService.exists(positionId);
        if (!positionExists) {
            throw new NotFoundError(ErrorCode.POSITION_NOT_FOUND, "Position not found", { positionId });
        }

        // Checking if controller exists before checking for their qualifications
        const controller = await this.controllerService.getByUserId(userId);
        if (controller === null) {
            throw new NotFoundError(ErrorCode.CONTROLLER_NOT_FOUND, "Controller not found", { userId });
        }

        if (controller.qualification.id < positionId) {
            throw new ForbiddenError(
                ErrorCode.INSUFFICIENT_QUALIFICATION,
                "Controller does not have the required qualification for this position",
                { userId, positionId, qualificationId: controller.qualification.id }
            );
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
            throw new NotFoundError(
                ErrorCode.CONTROLLER_ASSIGNMENT_NOT_FOUND,
                "Controller Assignment not found",
                { eventId, userId }
            );
        };

        // Here we don't check if the user exists because if the assignment exists, that means that
        // a valid user was already being used for the assignment.
        // We will not allow to change to user of the assignment, instead it will have to be replaced,
        // because it is a primary key in the database as a composite PK
        // This may be subject to change in the future

        if (change.airportId !== undefined) {
            const airportExists = await this.airportService.exists(change.airportId);
            if (!airportExists) {
                throw new NotFoundError(ErrorCode.AIRPORT_NOT_FOUND, "Airport not found", { airportId: change.airportId });
            }
        }

        if (change.positionId !== undefined) {
            const positionExists = await this.positionService.exists(change.positionId);
            if (!positionExists) {
                throw new NotFoundError(ErrorCode.POSITION_NOT_FOUND, "Position not found", { positionId: change.positionId });
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
            throw new NotFoundError(
                ErrorCode.CONTROLLER_ASSIGNMENT_NOT_FOUND,
                "Controller Assignment not found",
                { eventId, userId }
            );
        }

        return await this.ecaRepo.deleteControllerAssignment(eventId, userId);
    }
}
