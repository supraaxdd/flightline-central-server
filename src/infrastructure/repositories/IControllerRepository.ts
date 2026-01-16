import { IController } from "../models/IController";
import { IControllerPosition } from "../models/IControllerPosition";
import { IUser } from "../models/IUser";

export interface IControllerRepository {
    getByUserId(id: number): Promise<IController | null>;
    create(userId: number): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    update(id: number): Promise<boolean>;
}