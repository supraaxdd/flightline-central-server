import { IControllerPosition } from "./IControllerPosition";
import { IUser } from "./IUser";

export interface IController {
    user: IUser;
    controller_since: Date;
    qualification: IControllerPosition;
}