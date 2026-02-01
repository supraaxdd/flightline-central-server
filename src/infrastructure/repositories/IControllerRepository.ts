import { IControllerUpdateDto } from "../dtos/IControllerUpdateDto";
import { IController } from "../models/IController";

export interface IControllerRepository {
    getByUserId(id: number): Promise<IController | null>;
    existsByUserId(id: number): Promise<boolean>;
    create(userId: number, controllerSince: Date): Promise<void>;
    delete(id: number): Promise<void>;
    update(userId: number, controllerChange: IControllerUpdateDto): Promise<void>;
}