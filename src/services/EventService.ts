import { IEventUpdateDto } from "../infrastructure/dtos/IEventUpdateDto";
import { EventRepository } from "../infrastructure/repositories/EventRepository";

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
        // Not sure if we need an exists check here, as the same host could host multiple events in one day
        return await this.eventRepo.create(hostId, dateHosted);
    }

    public async deleteEvent(id: number) {
        const exists = await this.exists(id);

        // During the implementation of the error class story, this should throw an error
        // with an appropriate status code, where this error would be handled in the controller
        if (!exists) return true;

        return await this.eventRepo.delete(id);
    }

    public async updateEvent(
        eventId: number,
        update: IEventUpdateDto
    ) {
        const exists = await this.exists(eventId);

        // This should throw an error, which should be implemented during the error class implementation story
        if (!exists) return false;
        return await this.eventRepo.update(eventId, update);
    }
}