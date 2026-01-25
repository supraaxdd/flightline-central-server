import { IAirport } from "./IAirport";
import { IControllerPosition } from "./IControllerPosition";
import { IController } from "./IController";

export interface IEventController {
    controller: IController;
    airport: IAirport;
    position: IControllerPosition;
}