import { IController } from "../models/IController";

export interface IControllerRepository {
    getByUserId(id: number): Promise<IController | null>;
    create(userId: number, controllerSince: Date): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    update(id: number): Promise<boolean>;
}