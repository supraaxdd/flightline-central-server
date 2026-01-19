import { IEventUpdateDto } from "../infrastructure/dtos/IEventUpdateDto";
import { IEventControllerAttendeeUpdateDto } from "../infrastructure/dtos/IEventControllerAttendeeUpdateDto";
import { EventRepository } from "../infrastructure/repositories/EventRepository";

export class EventService {
    private eventRepo: EventRepository = new EventRepository();

    getEventById = async (id: number) => await this.eventRepo.getEventById(id);

    getEventsHostedByUserById = async (userId: number) => await this.eventRepo.getEventsHostedByUserById(userId);

    createEvent = async (hostId: number, dateHosted: Date) => await this.eventRepo.create(hostId, dateHosted);

    updateEvent = async (
        eventId: number,
        update: IEventUpdateDto
    ) => {
        if (Object.keys(update).length === 0) {
            throw new Error("No event fields provided for update");
        }

        // return this.eventRepo.update(eventId, update);
    };

    updateEventAttendee = async (
        eventId: number,
        userId: number,
        update: IEventControllerAttendeeUpdateDto
    ) => {
        if (Object.keys(update).length === 0) {
            throw new Error("No attendee fields provided for update");
        }

        // return this.eventRepo.updateAttendee(eventId, userId, update);
    };
}