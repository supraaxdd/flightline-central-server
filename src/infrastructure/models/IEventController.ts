import { IAirport } from "./IAirport";
import { IControllerPosition } from "./IControllerPosition";
import { IUser } from "./IUser";

export interface IEventController {
    user: IUser;
    airport: IAirport;
    position: IControllerPosition;
}