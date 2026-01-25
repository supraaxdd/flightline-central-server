import { IEventUpdateDto } from "../infrastructure/dtos/IEventUpdateDto";
import { EventRepository } from "../infrastructure/repositories/EventRepository";

export class EventService {
    private static instance?: EventService;

    private constructor() { };

    public static getInstance = () => {
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

    public async createEvent(
        hostId: number,
        dateHosted: Date
    ) {
        return await this.eventRepo.create(hostId, dateHosted);
    }

    public async deleteEvent(id: number) {
        return await this.eventRepo.delete(id);
    }

    public async updateEvent(
        eventId: number,
        update: IEventUpdateDto
    ) {
        return await this.eventRepo.update(eventId, update);
    }
}