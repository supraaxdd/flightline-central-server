import { IUser } from "../user";

export interface IController {
    user: IUser;
    controller_since: Date;
    qualification: string;
}