import { IEventController } from "./IEventController";
import { IUser } from "./IUser";

export interface IEvent {
    id: number;
    host: IUser;
    dateHosted: Date;
    active: boolean;
    controllers: IEventController[];
}