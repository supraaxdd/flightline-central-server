import { IControllerPosition } from "../models/IControllerPosition";

export interface IControllerQualificationRepository {
    getByUserId(userId: number): Promise<IControllerPosition | null>;
    update(userId: number, positionId: number): Promise<boolean>; // Change to void and let it error if there is an error
}