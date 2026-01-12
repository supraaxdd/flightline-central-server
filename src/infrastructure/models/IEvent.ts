import { IController } from "./IController";
import { IUser } from "../user";

export interface IEvent {
    id: number;
    host: IUser;
    controllers: IController[];
}