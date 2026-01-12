import { IController } from "./IController";
import { IUser } from "./IUser";

export interface IEvent {
    id: number;
    host: IUser;
    controllers: IController[];
}