import { IEventUpdateDto } from "../infrastructure/dtos/IEventUpdateDto";
import { EventRepository } from "../infrastructure/repositories/EventRepository";

export class EventService {
    private eventRepo: EventRepository = new EventRepository();

    getEventById = async (id: number) => await this.eventRepo.getEventById(id);

    getEventsHostedByUserById = async (userId: number) => await this.eventRepo.getEventsHostedByUserById(userId);

    createEvent = async (hostId: number, dateHosted: Date) => await this.eventRepo.create(hostId, dateHosted);

    deleteEvent = async (id: number) => await this.eventRepo.delete(id);

    updateEvent = async (
        eventId: number,
        update: IEventUpdateDto
    ) => await this.eventRepo.update(eventId, update);
}