import { IEventUpdateDto } from "../infrastructure/dtos/IEventUpdateDto";
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

    public async exists(id: number) {
        return await this.eventRepo.exists(id);
    }

    public async createEvent(
        hostId: number,
        dateHosted: Date
    ) {
        const userExists = await this.userService.existsById(hostId);
        if (!userExists) {
            throw Error("Host User not found");
        }

        const userRoles = await this.userService.getRoles(hostId);
        if (!userRoles?.find(r => r.name === UserRole.EVENT_HOST)) {
            throw Error("Host user does not have permission to host events");
        }

        return await this.eventRepo.create(hostId, dateHosted);
    }

    public async deleteEvent(id: number) {
        const exists = await this.exists(id);
        if (!exists) {
            throw Error("Event not found");
        }

        return await this.eventRepo.delete(id);
    }

    public async updateEvent(
        eventId: number,
        update: IEventUpdateDto
    ) {
        const exists = await this.exists(eventId);
        if (!exists) {
            throw Error("Event not found");
        }

        if (update.hostId !== undefined) {
            const userExists = await this.userService.existsById(update.hostId);
            if (!userExists) {
                throw Error("Host user not found");
            }

            const userRoles = await this.userService.getRoles(update.hostId);
            if (!userRoles?.find(r => r.name === UserRole.EVENT_HOST)) {
                throw Error("Host user does not have permission to host events");
            }
        }

        return await this.eventRepo.update(eventId, update);
    }
}