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

        airportIdentifier: string,

        positionIdentifier: string

    ) {

        const airport = await this.airportService.resolveAirportOrThrow(airportIdentifier);

        const position = await this.positionService.resolvePositionOrThrow(positionIdentifier);



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



        const controller = await this.controllerService.getByUserId(userId);

        if (controller === null) {

            throw new NotFoundError(ErrorCode.CONTROLLER_NOT_FOUND, "Controller not found", { userId });

        }



        if (controller.qualification.id < position.id) {

            throw new ForbiddenError(

                ErrorCode.INSUFFICIENT_QUALIFICATION,

                "Controller does not have the required qualification for this position",

                { userId, positionId: position.id, qualificationId: controller.qualification.id }

            );

        }



        return await this.ecaRepo.createControllerAssignment(eventId, userId, airport.id, position.id);

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



        let resolvedAirportId = change.airportId;

        let resolvedPositionId = change.positionId;



        if (change.airport !== undefined) {

            resolvedAirportId = (await this.airportService.resolveAirportOrThrow(change.airport)).id;

        }



        if (change.position !== undefined) {

            resolvedPositionId = (await this.positionService.resolvePositionOrThrow(change.position)).id;

        }



        if (resolvedAirportId !== undefined) {

            const airportExists = await this.airportService.exists(resolvedAirportId);

            if (!airportExists) {

                throw new NotFoundError(ErrorCode.AIRPORT_NOT_FOUND, "Airport not found", { airportId: resolvedAirportId });

            }

        }



        if (resolvedPositionId !== undefined) {

            const positionExists = await this.positionService.exists(resolvedPositionId);

            if (!positionExists) {

                throw new NotFoundError(ErrorCode.POSITION_NOT_FOUND, "Position not found", { positionId: resolvedPositionId });

            }



            const controller = await this.controllerService.getByUserId(userId);

            if (controller === null) {

                throw new NotFoundError(ErrorCode.CONTROLLER_NOT_FOUND, "Controller not found", { userId });

            }



            if (controller.qualification.id < resolvedPositionId) {

                throw new ForbiddenError(

                    ErrorCode.INSUFFICIENT_QUALIFICATION,

                    "Controller does not have the required qualification for this position",

                    { userId, positionId: resolvedPositionId, qualificationId: controller.qualification.id }

                );

            }

        }



        const updateDto: IEventControllerAttendeeUpdateDto = {};



        if (resolvedAirportId !== undefined) {

            updateDto.airportId = resolvedAirportId;

        }



        if (resolvedPositionId !== undefined) {

            updateDto.positionId = resolvedPositionId;

        }

        

        return await this.ecaRepo.updateControllerAssignment(eventId, userId, updateDto);

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


