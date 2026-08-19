import { IEventUpdateDto } from "../infrastructure/dtos/IEventUpdateDto";
import { ErrorCode, ForbiddenError, NotFoundError } from "../infrastructure/errors";
import { EventRepository } from "../infrastructure/repositories/EventRepository";
import { UserService } from "./UserService";
import { UserRole } from "../infrastructure/enums/UserRole";

export class EventService {
    private static instance?: EventService;

    private constructor() { };

    public static getInstance() {
        if (!EventService.instance) {
            EventService.instance = new EventService();
        }

        return EventService.instance;
    }

    private eventRepo: EventRepository = EventRepository.getInstance();
    private userService: UserService = UserService.getInstance();

    public async getEventById(id: number) {
        return await this.eventRepo.getEventById(id);
    }

    public async getEventsHostedByUserById(userId: number) {
        return await this.eventRepo.getEventsHostedByUserById(userId);
    }

    public async getActiveEvents() {
        return await this.eventRepo.getActiveEvents();
    }

    public async exists(id: number) {
        return await this.eventRepo.exists(id);
    }

    public async createEvent(
        hostId: number,
        dateHosted: Date
    ) {
        const userExists = await this.userService.existsById(hostId);
        if (!userExists) {
            throw new NotFoundError(ErrorCode.USER_NOT_FOUND, "Host User not found", { userId: hostId });
        }

        const userRoles = await this.userService.getRoles(hostId);
        if (!userRoles?.find(r => r.name === UserRole.EVENT_HOST)) {
            throw new ForbiddenError(ErrorCode.INSUFFICIENT_ROLE, "Host user does not have permission to host events", { userId: hostId, requiredRole: UserRole.EVENT_HOST });
        }

        return await this.eventRepo.create(hostId, dateHosted);
    }

    public async deleteEvent(id: number) {
        const exists = await this.exists(id);
        if (!exists) {
            throw new NotFoundError(ErrorCode.EVENT_NOT_FOUND, "Event not found", { eventId: id });
        }

        return await this.eventRepo.delete(id);
    }

    public async updateEvent(
        eventId: number,
        update: IEventUpdateDto
    ) {
        const exists = await this.exists(eventId);
        if (!exists) {
            throw new NotFoundError(ErrorCode.EVENT_NOT_FOUND, "Event not found", { eventId });
        }

        if (update.hostId !== undefined) {
            const userExists = await this.userService.existsById(update.hostId);
            if (!userExists) {
                throw new NotFoundError(ErrorCode.USER_NOT_FOUND, "Host user not found", { userId: update.hostId });
            }

            const userRoles = await this.userService.getRoles(update.hostId);
            if (!userRoles?.find(r => r.name === UserRole.EVENT_HOST)) {
                throw new ForbiddenError(ErrorCode.INSUFFICIENT_ROLE, "Host user does not have permission to host events", { userId: update.hostId, requiredRole: UserRole.EVENT_HOST });
            }
        }

        return await this.eventRepo.update(eventId, update);
    }
}
