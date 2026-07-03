import { IControllerPosition } from "../models/IControllerPosition";

export interface IControllerQualificationRepository {
    getByUserId(userId: number): Promise<IControllerPosition | null>;
}